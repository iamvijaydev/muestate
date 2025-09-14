---
sidebar_position: 1
---

# Store setup

## Install Muestate
```bash npm2yarn
npm install --save muestate
```

## Create a store
Muestate provides a `createStore` utility to create a store with mutable state and methods to manipulate the state. The store is shared via React Context.

```ts
import { v4 as uuid } from "uuid"
import { createStore, type SetStateFn } from "muestate"

export type TodoItem = {
  title: string
  isCompleted: boolean
};
// Since the state is mutable, we are not constrained to arrays
export type TodoState = Map<string, TodoItem>

const makeMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo(title: string) {
    setState((todos) => {
      todos.set(uuid(), { title, isCompleted: false })
      return todos
    });
  },
  toggleCompleted(id: string) {
    setState((todos) => {
      const todo = todos.get(id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
      return todos
    });
  },
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