---
sidebar_position: 2
---

# Create store
The `createStore` utility from Muestate creates a Context and two Hooks. The `Provider` Component instanciates the store singleton and the React Context. The React Context holds the value of the store singleton. Two React Hooks `useStore` & `useState` are for accessing the state and methods of the store. These Hooks can be accessed anywhere under the Context.
```ts {15-22}
export type TodoState = Map<string, {
  title: string
  isCompleted: boolean
}>

const makeMethods = (
  setState: SetStateFn<TodoState>
) => ({
  addTodo(title: string) { ... },
  toggleCompleted(id: string) { ... },
})

const initialState: TodoState = new Map()

export const [
  // access the store methods (`addTodo` and `toggleCompleted`)
  useTodoStore,
  // access the state as a reactive value
  useTodoState,
  // provider to share the store via React Context
  TodoProvider,
] = createStore(initialState, makeMethods)
```

## Namming convention
The Muestate utilty, `createStore` returns array of values. You can name the Hooks and Provider to align it with the current store. For e.g.:
```ts {2-4}
export const [
  useProjectionEditorStore,
  useProjectionEditorState,
  ProjectionEditorProvider,
] = createStore(initialState, makeMethods)
```

## Where to place `Provider`
The Provider must wrap all the pages and components that will access `useStore` and `useStore`. 
```tsx {6,11}
// feature/projection/page/editor/ProjectionEditor.tsx
...
return (
  <ProductListProvider>
    <AutoSaveProvider>
      <ProjectionEditorProvider>
        <GlobalActions />
        <ProductList />
        <DragAndDropEditor />
        <MultipleDetailsSwitch />
      </ProjectionEditorProvider>
    </AutoSaveProvider>
  </ProductListProvider>
)

// feature/projection/page/editor/feature/DragAndDropEditor.tsx
...
const store = useProjectionEditorStore()
const tierList = useProjectionEditorState(state => Array.from(state.tierList))
```