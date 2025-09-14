---
sidebar_position: 2
---

# Non-reactive UI
Since the state is mutable, the app wont re-render on state changes, unless we explicitly read the state as a reactive value. This gives us the flexibility to control which part of the app should render and when.

## Todo App
Let's build a simple todo app to demonstrate how to connect the store to UI components. The app uses the `TodoProvider` to share the store via React Context. All the desendant components can access the store and state via hooks.

```tsx {4-8}
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

## Todo form
The form to add todo uses the `store.addTodo` method to add a new todo item. `store` is not a reactive value, so using it won't cause re-renders.

> All the store methods (functions) stays the same across renders, so they can be safely used in `useEffect` or as event handlers without causing re-renders.

```tsx {2,5}
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