---
sidebar_position: 3
title: Acess store methods
sidebar_label: 🪸 Acess store methods
---

# 🪸Acess store methods
The Hook to access store methods is created during the store creation.
```ts {2}
export const [
  useCountStore,
  useCountState,
] = createStore(...)
```

The `useCountStore` Hook returns the store methods. It can be used to access the store methods in any component.

```tsx {4} title="Counter.tsx"
import { useCountStore } from '@/feature/counter/store.ts'

export const Counter = () => {
  const { increment, decrement } = useCountStore()
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

:::info

Store methods are non-reactive. They are created once and never change. They only update the mutable state inside the store. You can safely include them in the dependency array of `useEffect` or other Hooks without causing unnecessary re-renders.

:::

## 🦑 Access multiple stores

In a properly architectured app, you can also access methods of different stores
```tsx {6-8} title="ProjectionEditor.tsx"
import { useProductStore } from '@/feature/product/store.ts'
import { useEditorStore } from '@/feature/editor/store/editor.ts'
import { useDiffStore } from '@/feature/editor/store/diff.ts'

export const ProjectionEditor = () => {
  const productStore = useProductStore()
  const editorStore = useEditorStore()
  const diffStore = useDiffStore()
  ...
}
```

## 🐲 Store Managers

For very large applications, you can also create managers that encapsulate the logic of accessing multiple stores. A manager is an glorified React Hook that uses multiple stores and exposes a simpler API to the components.
```ts {5,20-23} title="editorManager.ts"
import { useProductStore } from '@/feature/product/store.ts'
import { useEditorStore } from '@/feature/editor/store/editor.ts'
import { useDiffStore } from '@/feature/editor/store/diff.ts'

export const useEditorManager = () => {
  const productStore = useProductStore()
  const editorStore = useEditorStore()
  const diffStore = useDiffStore()
  
  const loadProducts = async () => { ... }
  const loadEstimate = async (id: string) => { ... }
  ...
  const initFreshEditor = async () => { ... }
  const initLoadSavedEditor = async (id: string) => { ... }
  const addProductToEditor = (productId: string) => { ... }
  const removeProductFromEditor = (productId: string) => { ... }
  ...

  return {
    initFreshEditor,
    initLoadSavedEditor,
    addProductToEditor,
    removeProductFromEditor
    ...
  }
}
```

:::info

As `useEditorManager` is only access the store methods, it is non-reactive. It can be used in any component without worrying about unnecessary re-renders. A component using the manager and the store state will re-render only when the state changes.

:::