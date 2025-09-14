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