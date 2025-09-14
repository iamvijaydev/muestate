---
sidebar_position: 3
---

# Reactive UI
The todo list and status components read the state as a reactive value using `useTodoState`. The components re-render when the state changes.

## Todo list
The todo list component uses a state selector to convert the `Map` to an array of IDs. The component re-renders when a new todo is added.

```tsx {2-12}
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

The state comparator returns `true` if the previous and current array of IDs are the same. This avoids re-renders when toggling the `isCompleted` state of a todo item. The component only re-renders when a new todo is added.

## Todo item
The todo item component reads the `isCompleted` state as a reactive value using `useTodoState`. The component re-renders when the `isCompleted` state changes.

```tsx {4,6-8}
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

## Status footer
The status footer component uses a computed state value to display the number of completed todos. The component re-renders when the state changes.

The default comparator of `Object.is` is sufficient here, as the computed string value will change when the state changes.
```tsx {5-9}
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