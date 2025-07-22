export const store = `
import { createStore, type SetStateFn } from 'muestate'
            
const makeMethods = (setState: SetStateFn<number>) => ({
  increment() {
    setState((prev) => prev + 1)
  },
  decrement() {
    setState((prev) => prev - 1)
  },
  update(count: number) {
    setState(count)
  },
  reset() {
    setState(0)
  },
})

export const [
  useCounterStore,
  useCounterState,
  CounterProvider
] = createStore<
  number,
  ReturnType<typeof makeMethods>
>(2, makeMethods)
`