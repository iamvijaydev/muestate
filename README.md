# Muestate
A React library for creating stores with mutable state and shared via context API.

In an app with complex data structure or sofisticated UI with numerious DOM node, this library provides means to control which part of app should render and when. Fine tune performance of any desired DOM node, small or big, via internal core utilities.

At Muestate's core:
1. State is mutable `useRef`, app wont re-render on state changes
2. State changes can be subscribed to made reactive using `useState`
3. If required, a sub-set of the state can be subscribed and made reactive
4. State and methods are encapsulated as a singleton store
5. Store is initialized and accessible via Context

## Quick start

### Install Muestate
```bash
# Ensure peer dependency "react" is installed
npm install muestate --save
```

### Create an user store
```ts
import { type SetStateFn, createStore } from 'muestate'

export type UserState = {
  name: string
  state: string
  sport: string
}

const initialState: UserState = {
  name: 'Vijay',
  state: 'KL, IND',
  sport: 'swimming',
}

const getMethods = (setState: SetStateFn<UserState>) => ({
  setItem(key: keyof UserState, value: string = "") {
    setState((prev) => ({ ...prev, [key]: value }))
  },
  clearItem(key: keyof UserState) {
    setState((prev) => ({ ...prev, [key]: "" }))
  },
  resetAll() {
    setState({ ...initialState })
  },
})

export const [
  useUserStore,
  useUserState,
  UserProvider
] = createStore(initialState, getMethods)
```

### Wrap with `UserProvider`
Wrap the consumers with the provider. This will initialize the store. Since the store is a singleton object that never changes, the `UserProvider` will never re-render.
```tsx
export const SharedParentComponent = () => (
  <...>
    <UserProvider>
      <ConsumerComponentA />
      <...>
        <ConsumerComponentB />
      </...>
    </UserProvider>
  <...>
)
```

### Consume the non-reactive store
Any component that only consumes `useUserStore` will not re-render on state changes. The returned `store` is a singleton object that never changes.
```tsx
export const ActionsComponent = () => {
  const store = useUserStore()

  const onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    store.setItem(e.target.name as keyof UserState, e.target.value)
  }

  const onClear = (e: ChangeEvent<HTMLButtonElement>) => {
    store.clearItem(e.target.name as keyof UserState)
  }

  ...
}
```

### Consume the reactive state
Any component that consumes `useUserState` will re-render on state changes.
```tsx
export const InteractiveComponent = () => {
  const state = useUserState()

  if (!state.name.trim().length) {
    return <p>Introduce yourself.</p>
  }

  let introduction = `Hey, I'm ${state.name}`

  introduction += state.address.trim().length ? ` from ${state.address}.` : '.'
  introduction += state.sport.trim().length > 0 ? ` My favourite sport is ${state.sport}.` : ''

  return <p>{introduction}</p>
}
```
As the state grows with the application growth, `useUserState` can be replaced with `useReactiveState` to make small portion or selective part of the large state, reactive.

## Understanding state in Muestate
Muestate is open to all state types. It can be primitives like `string`, `number`, `boolean`, `bigint`, or `symbols`:
```ts
// store.ts
createStore<number>(0, methods)
createStore<string>('', methods)
```
However, using Muestate with primitive datatypes may be an overkill. The same can also be achieved using `useState` and state sharing via props.

You can use Muestate to manage larger state objects that can be shared across various non-sibling React components:
```tsx
// store.ts
createStore<ProductFilterState>(productFilter, methods)

// Filters.tsx
const store = useProductFilterStore()
const state = useProductFilterState()

// store is a singleton object with methods defined with `createStore`
// useProductFilterStore() will return the same object everywhere
store.updateSearch('query') 

// useProductFilterState() returns a `useState` cloned instance (`structuredClone`) of internal mutable state
// any component using state will re-render to all state changes
<input value={state.search} />
```
### Selective reactivity
Where Muestate really shines is when you have very large state object. Any tiny state changes should not trigger re-render of the entire app. You selectively make small parts of app reactive:
```ts
// store.ts
createStore<DashboardWidgetState>(dashboardWidgetState, methods)

// FilterActions.tsx
// this component will *not* re-render as it's not using state
const store = useDashboardWidgetStore()
...
<button onClick={store.restoreLayout()} />

// GraphWidget.tsx
const store = useDashboardWidgetStore()

// this widget intance will only re-render if its height is changed
// `useReactiveState` takes the mutable store and a state selector function
// only the returned section becomes reactive (useState)
const height = useReactiveState(
  store,
  (state: DashboardWidgetState) => state.widgets.find(widget => widget.id === prop.id)?.height
)

// You can also attach a comparator function to ensure
// re-render only happens when it's really required
const position = useReactiveState(
  store,
  (state: DashboardWidgetState) => state.widgets.find(widget => widget.id === prop.id)?.position,
  (
    prev?: DashboardWidgetState,
    curr?: DashboardWidgetState
  ) => prev?.x !== curr?.x || prev?.y !== curr?.y
)

// of-course you can club multiple items into one
const [width, height] = useReactiveState(
  store,
  (state: DashboardWidgetState) => {
    const widget = state.widgets.get(prop.id) // widgets is now a Map

    if (widget) return [widget.width, widget.height]

    return [0, 0]
  }
)
// Note: As an array is returned from selector, on state updates, the data inside the array may be the same
// but the outer array is not the same, thus causing re-renders. Explore if comparator function is required.
```

## Understanding methods in Muestate
The `createStore` expects a `getMethod` function which should use the `setState` function to set the state changes. There are a couple of ways store methods can update the state. `getMethod` function will recieve two arguments to manage state updates:
1. `setState` function: update the internal mutable state
2. `notifyNow` function: for async state update notify state update to subscribers (more on that later)

### Return full state
```ts
const getMethods = (setState: SetStateFn<UserState>) => ({
  resetUser() {
    setState({ ...initialState })
  },
})
```

### Return partial state
```ts
const getMethods = (setState: SetStateFn<FilterState>) => ({
  setQuery(value: string = "") {
    setState({ query: value })
  },
})
```

### Return callback function
```ts
const getMethods = (setState: SetStateFn<ProductListState>) => ({
  startFetch({ pageNo, perPage }: FetchArgs = {}) {
    setState((prev) => ({
      ...prev,
      pageNo: pageNo ?? prev.pageNo,
      perPage: perPage ?? prev.perPage,
      isPending: true,
      isError: false,
    }))
  },
  // actual fetching happens outside in a command/hook
  cancelFetch() {
    setState({ isPending: false, })
  }
  finishFetch(isError: boolean, res?: ApiRes) {
    setState({
      isPending: false,
      isError,
      data: res?.data ?? [],
      totalCount: res?.data ?? 0,
    })
  },
})
```

### Manage async action within method
```ts
const getMethods = (setState: SetStateFn<ProductListState>, notifyNow: NotifyNowFn) => ({
  async fetchProducts({ pageNo, perPage }: FetchArgs = {}) {
    setState((prev) => ({
      ...prev,
      isPending: true,
      isError: false,
      pageNo: pageNo ?? prev.pageNo,
      perPage: perPage ?? prev.perPage,
    }))
    notifyNow() // notify the state change subscription; forcing a re-render, show the loading UI

    try {
      const { data, totalCount } = await fetch(...)

      setState({
        data,
        totalCount,
        isPending: false,
        isError: false,
      })
    } catch (error) {
      setState({
        data: [],
        totalCount: 0,
        isPending: false,
        isError: true,
      })
    }
  }
})
```

## Philisophy
React has all the necessary features to create an excellant store sharable via Context. We do not need any external library. In fact this library uses the same features, and abstract away the boilerplate, as we'll see below.

### Build a React Context store
Let's start with a very basic store.
```ts
// store.ts
export type UserState = {
  name: string
  state: string
  sport: string
}

const initialState: UserState = {
  name: 'Vijay',
  state: 'KL, IND',
  sport: 'swimming',
}

export const useUserStore = (initialState: UserState) => {
  const [state, setState] = useState<UserState>(initialState)

  const setItem = (key: keyof UserState, value: string = "") {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const clearItem = (key: keyof UserState) {
    setState((prev) => ({ ...prev, [key]: "" }))
  }

  return { state, setItem, clearItem }
}
```
This store can then be used in a component.
```tsx
const Component = () => {
  const { state, setItem } = useUserStore({
    name: 'Vijay',
    state: 'KL, IND',
    sport: 'swimming',
  })

  // store.state.name
  // store.setItem(...)
}
```
As the application grows there are more than one component that needs to access the same store instance. Let's share the store via Context.
```tsx
// context.ts
const UserContext = createContext<UseUserStoreType | undefined>(
  undefined
)
```
Now let's intitialize everything.
```tsx
// Parent.tsx
const Parent = () => {
  const store = useUserStore()

  const value = useMemo(() => store, [store])

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const ComponentA = () => {
  const store = useContext(UserContext)

  if (context === null || context === undefined) {
    throw new Error(
      "Cannot use 'UserContext' without wrapping the parent with \"UserContext Provider\""
    )
  }

  // store.state.name
  // store.setItem(...)
}

const ComponentB = () => {
  const store = useContext(UserContext)

  if (context === null || context === undefined) {
    throw new Error(
      "Cannot use 'UserContext' without wrapping the parent with \"UserContext Provider\""
    )
  }

  // store.state.name
  // store.setItem(...)
}
```
Suffice to say, a lot of boilerplate and repeated code. Let's reduce some of the boilerplate.

### Build a React Context store v2
```tsx
// state.ts
export type UserState = {
  name: string
  state: string
  sport: string
}
export const getInitialState = (): UserState => ({
  name: 'Vijay',
  state: 'KL, IND',
  sport: 'swimming',
})

// store.ts
export const useUserStore = () => {
  const [state, setState] = useState<UserState>(getInitialState())

  const setItem = (key: keyof UserState, value: string = "") {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const clearItem = (key: keyof UserState) {
    setState((prev) => ({ ...prev, [key]: "" }))
  }

  return { state, setItem, clearItem }
}

// context.ts
const UserContext = createContext<UseUserStoreType | undefined>(
  undefined
)
const useUserContext: (): UserContext => {
  return useDefinedContext(Context)
}

// Provider.tsx
export const UserProvider = (props: PropsWithChildren): JSX.Element => {
  const store = useUserStore()
  const value = useMemo(() => store, [store])

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}
```
`useDefinedContext` basically wraps the throw error case when the Context is accessed without the provider. `useUserContext` takes away one additional step to access the store via Context.

Now the Parent and Childen can be simpler. They do not need to import everything or call functions with args.
```tsx
// Parent.tsx
const Parent = () => {
  return (
    <UserProvider>
      ...
    </UserProvider>
  )
}
const ComponentA = () => {
  const store = useUserContext()
  // store.state.name
  // store.setItem(...)
}
const ComponentB = () => {
  const store = useUserContext()
  // store.state.name
  // store.setItem(...)
}
```

### So what's wrong with the store?
