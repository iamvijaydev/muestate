---
sidebar_position: 3
---

# Working with Map and Set
Muestate allows you to explore beyond plain pure objects. We can use `Map` as the state value. These data structure offers better DX over pure objects.

## Map state
Configure the state as a `Map` and provide an empty `Map` as intial state as `createStore` argument.
```ts
import { type SetStateFn, type NotifyNowFn, createStore } from 'muestate'

export type Todo = {
  id: string
  createdAt: number
  title: string
  isCompleted: boolean
}

export type TodoState = Map<string, Todo>

const getMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo(title: string) { ... },
  toggleTodo(id: string) {
    setState((state) => { ... })
  },
  removeCompleted() {
    setState((state) => { ... })
  }
})

export const [
  ...
] = createStore<TodoState>(new Map(), getMethods)
```
The store methods directly operates on the `Map`.
```ts {8,16,28}
addTodo(title: string) {
  setState((state) => {
    state.set(uuid(), {
      title,
      isCompleted: false,
    });
    
    return state
  })
},
toggleTodo(id: string) {
  setState((state) => {
    const todo = state.get(id)

    if (todo) {
      todo.isCompleted = !todo.isCompleted
    }

    return state
  })
},
removeCompleted() {
  setState((state) => {
    // Map is an iteratrable, deleting while looping works fine
    // In contrast Array will not be straight forward
    for (let [id, todo] of state) {
      if (todo.isCompleted) {
        state.delete(id)
      }
    }

    return state
  })
}
```

## Render the list
Updating a `Map` state a lot easier than `Array`. However, we need to convert it to `Array` in the UI. In the traditional React app we always get a new array via props or state changes. In Muestate, the state changes are controlled. We can decided when the state actually changes. 

```tsx
const todoIdList = useTodoState<string[]>(
  // state getter: convert the todo Map to an array of ids.
  (state) => Array.from(state.keys()),
  // state comparator: avoid re-render when toggling `isCompleted`.
  (prev, curr) => {
    return (
      // recreate array when an item is added or removed
      prev.length !== curr.length ||
      // recreate array if items are re-arranged
      prev.some((id, i) => !Object.is(id, curr[i]))
    )
  }
)
```
We will learn about store state in next section.

## Set states
It's exactly the same as `Map`, only types and data structure changes.
```ts
// store.ts
export type CategoryState = Set<string>

const getMethods = (setState: SetStateFn<CategoryState>) => ({
  add(category: string) {
    setState(state => {
      state.add(category)
      return state
    })
  },
  remove(category: string) {
    setState((state) => {
      state.remove(category)
      return state
    })
  }
})

export const [
  ...
] = createStore<CategoryState>(new Set(), getMethods)

// CategoryList.tsx
const list = useTodoState<string[]>(state => Array.from(state.categoryList))
```
