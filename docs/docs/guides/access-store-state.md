---
sidebar_position: 4
title: Access store methods
sidebar_label: 🥳 Access store methods
---

# 🥳 Access store state
The internal state of Muestate is mutable. However, to make our React UI re-render when state changes, we need to convert the mutable state to a reactive state value. The Hook to access the internal state as a reactive value is created during store creation.
```ts {4}
export const [
  useCountStore,
  useCountState,
] = createStore(...)
```
The Hook can return the entire state or a part of the state using a state selector function. The returned value can be:
1. A reactive copy of the entire state 
2. A reactive copy of the state's subset
3. A reactive computed value derived from the state

:::info

As a best practice, create the reactive state (local state) in the component that needs it. You would have few component re-render plus avoids prop drilling entirely.

:::

:::warning

A reactive copy of the entire state should be used sparingly.

:::

## 🥰 Full state
```tsx {1} title="UserDetails.tsx"
const userDetails = useUserDetailsState()

return (
  <div>
    <img src={userDetails.avatar} alt={userDetails.name} />
    <h3>{userDetails.name}</h3>
    ...
  </div>
)
```
`useUserDetailsState` will make a strucured clone of the internal mutable state and place the clone it inside `React.useState`. `userDetails` is a local `React.useState` value of `UserDetails.tsx` component.

When the state is updated via store methods, `useUserDetailsState` will update `userDetails` via `setState`. The component will re-render to reflect the changes.

---

## 😍 Partial state
We can pass a state selector function to return a part of the state. The selector function receives the full state as its argument. The returned value become a `React.useState` value.

```tsx {2} title="AdvancedFilters.tsx"
// type AdvancedFilterType = Map<id, DynamicFilterShape>
const filters = useFilterState(state => Array.from(state.advancedFilters.keys()))
// filters = ['brands', 'discounts', 'itemCondition', ...]

return (
  <div>
    {
      filters.map(id => (
        <FilterItem key={filter.id} filterId={id} />
      ))
    }
  </div>
)
```
In `AdvancedFilters.tsx`, only the keys of `advancedFilters` are created as local state. The component will re-render only when the keys change.

`⚡️` For a static set of filters, `AdvancedFilters` will only render once.

`🔥` For a related set of filters, choosing one enables/disable other filters, `AdvancedFilters` will re-render to reflect the changes. E.g. Choosing "Brand A" may enable the "Discount" filter.

`✨` For a value-connected set of filters, choosing one resets/updates other filter value, `AdvancedFilters` will only render once. E.g. Choosing "Brand A" may reset the "Item Condition" filter value.

```tsx {2,3} title="FilterItem.tsx"
// type AppliedFiltersType = Map<id, DynamicFilterValue>
const value = useFilterState(state => state.appliedFilters.get(filterId))
const filter = useFilterState(state => state.advancedFilters.get(filterId))

return (
  <div>
    <h3>{filter.name}</h3>
    <SelectMenu
      value={value}
      options={filter.options}
      onChange={next => { store.onChange(id, next) }}
    />
  </div>
)
```
In `FilterItem.tsx`, only the data related to current `filterId` are created as local state. The component will re-render only when the filter data or its applied value changes.

`⚡️` For a static set of filters, `FilterItem` will only render once.

`🔥` For a related set of filters, choosing one enables/disable other filters, `FilterItem` will only re-render if the key passed from `AdvancedFilters` changed.

`✨` For a value-connected set of filters, choosing one resets/updates other filter value, `FilterItem` will only re-render if its own applied value changed.

---

## 🤩 Computed state
We can also derive a computed value from the state. It's neither a state sub-set nor a wrapper around it.

```tsx {3,12,13} title="AdvancedFilterStats.tsx"
const msg = useFilterState<string | null>(state => {
  if (state.appliedFilters.size === 0) {
    return null
  }

  const applied = Array.from(state.appliedFilters.entries)
  const firstApplied = state.advancedFilters.get(
    applied[0][0]
  )!.name

  return state.appliedFilters.size === 1 ?
    `${firstApplied} applied` :
    `${firstApplied} +${state.appliedFilters.size - 1} filters applied`
})

```

As we apply multiple filters, the status will show msg as:
- /nothing/
- Brand A applied
- Brand A +2 filters applied

--- 

## 🫨 Avoid uncecessary re-renders
The 

`AdvancedFilters.tsx` can re-render if the parent component re-render or if another local state in `AdvancedFilters.tsx` changes. In both cases, `filters` will be evaluated as a new array instance. The new array still contains the same ids, however `React.useState` will think the state has changed and cause `AdvancedFilters.tsx` to re-render unnecessarily.

To solve this, `useUserDetailsState` we can pass a custom comparator function as the second argument. The comparator function receives the previous and next state as its arguments. It should return `true` if the states are **not equal**, otherwise `false`.

```tsx {3} title="AdvancedFilters.tsx"
const filters = useTodoState(
  state => Array.from(state.advancedFilters.keys())
  (prev, next) => prev.length !== next.length || prev.every((value, i) => value !== next[i]
)
```

:::info

The default comparator function is `Object.is` which is suitable for most cases. If you return the values wrapped in array or object, you should provide a custom comparator function to avoid unnecessary re-renders.

:::

---

## 😮‍💨 Avoid common antipatterns
There are few other senarios that may cause unnecessary re-renders.

```tsx {2} title="TodoList.tsx"

## Computed value
We can also derive a computed value from the state. The computed value is created as local state. The component will re-render when the computed value changes.

```tsx {2} title="TodoStats.tsx"
const total = useTodoState(state => state.todos.length)
const completed = useTodoState(state => state.todos.filter(todo => todo.completed).length)
const pending = total - completed
const percentCompleted = total === 0 ? 0 : Math.round((completed / total) * 100)
return (
  <div>
    <p>Total: {total}</p>
    <p>Completed: {completed}</p>
    <p>Pending: {pending}</p>
    <p>Percent Completed: {percentCompleted}%</p>
  </div>
)
```