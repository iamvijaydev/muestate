# Muestate

A React utility for creating application stores with mutable state and shared via the React Context API. Updating the state doesn't re-render the UI by default. In desired components, use the reactive hook to access complete, partial, or computed state.

## Quick start
Let's create a quick to-do application. We start with the store for the todo.
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

Time to build the UI for the todo. Firstly, the todo form:
```tsx
export const AddTodoForm = () => {
  const store = useTodoStore()
  ...
  const onSubmit = (e: any) => {
    store.addTodo(title)
    ...
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
      />
      ...
    </form>
  )
}
```

Next up, todo listing. Here we are strategically splitting the component in a way to avoid unnecessary re-renders:
```tsx
export const TodoList = () => {
  const todoIdList = useTodoState<string[]>(
    // state getter: convert the todo Map to an array of ids.
    (state) => Array.from(state.keys()),
    // state comparator: avoid re-render when toggling `isCompleted`.
    (prev, curr) => {
      return (
        prev.length !== curr.length ||
        prev.some((id, i) => !Object.is(id, curr[i]))
      )
    }
  )

  return (
    <div>
      {todoIdList.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  )
}
```
The state selector returns an array. Even if all the IDs are the same and in order, the outer array wrapper is re-created. This will cause re-renders. To improve over the default state comparator of `Object.is`, we provide our state comparator. 
```tsx
export const TodoItem = ({ id }) => {
  const store = useTodoStore()
  // The title never changes. We don't need a reactive value.
  const title = store.internals.getState().get(id)?.title
  // The completed state can change, hence the reactive value.
  const isCompleted = useTodoState<boolean>(
    (state) => Boolean(state.get(id)?.isCompleted)
  )

  return (
    <div>
      <input
        checked={isCompleted}
        onChange={() => store.toggleCompleted(id)}
      />
      <span>{title}</span>
    </div>
  )
}

```

Let's throw in a status footer as well
```tsx
export const TodoStatus = () => {
  // We use a computed state value
  const status = useTodoState<string>(
    (state) =>
      `${
        Array.from(state.values())
          .filter((todo) => todo.isCompleted)
          .length
      } of ${state.size} completed`
  )

  return <span>{status}</span>; // For e.g.: 2 of 10 completed
}
```

Finally, let's wrap everything inside `TodoProvider` to ensure the Hooks work properly:
```tsx
export const TodoApp = () => (
  // There is no state here. There is no prop-drilling.
  // Everything is clean. Sub-component only consumes the required data.
  <TodoProvider>
    <AddTodoForm />
    <TodoList />
    <TodoStatus />
  </TodoProvider>
)
```

[![Edit go-to-to-do](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/wc6ctc)

## How to install
```bash
npm install muestate --save
# or
yarn add muestate
# or
pnpm add muestate
```

## Understand the utility
- Check out the extensive examples
- Check out the Muestate hooks and how to use them in various situations
- Deep dive on how Muestate was derived









