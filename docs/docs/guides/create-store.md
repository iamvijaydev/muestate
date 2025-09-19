---
sidebar_position: 2
---

# Create store
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

const initialTodo: TodoState = new Map()

export const [
  // access the store methods (`addTodo` and `toggleCompleted`)
  useTodoStore,
  // access the state as a reactive value
  useTodoState,
  // provider to share the store via React Context
  TodoProvider,
] = createStore(initialTodo, makeMethods)
```

# Where to put `TodoProvider`