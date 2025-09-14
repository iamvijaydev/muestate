export const store = `
import { createStore, type SetStateFn } from 'muestate'
            
const getMethods = (setState: SetStateFn<string>) => ({
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
  ReturnType<typeof getMethods>
>('Vijay Dev', getMethods)
`