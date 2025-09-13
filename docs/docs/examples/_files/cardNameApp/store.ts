export const store = `
import { createStore, type SetStateFn } from 'muestate'
            
const makeMethods = (setState: SetStateFn<string>) => ({
  update(name: string) {
    setState(name)
  },
  reset() {
    setState('')
  },
});

export const [
  useCardNameStore,
  useCardNameState,
  CardNameProvider
] = createStore<
  string,
  ReturnType<typeof makeMethods>
>('Vijay Dev', makeMethods)
`