---
sidebar_position: 1
---

# Setup store methods
Muestate store methods are created using a factory function. This factory function recieves the `setState` and `notifyNow` function as arguments. We will explore `notifyNow` in async store methods. The `setState` allows state updates in multiple ways.

```ts
import type { SetStateFn, NotifyNowFn } from 'muestate'

const getMethods = (
  setState: SetStateFn<GuestDetailsType>,
  notifyNow: NotifyNowFn
) => {
  return {
    // full state update
    resetDetails() {
      setState({ ...defaultGuest })
    },
    // partial state update
    updateName(
      firstName: string,
      lastName?: string
    ) {
      setState({ name: `${firstName}${lastName ? ' ' + lastName : ''}` });
    },
    // callback
    upgradeSuite() {
      setState(state => {
        state.suit = state.isVip ? 'Presidential Suite' : 'Executive Suite';
        return state;
      })
    }
  }
}
```

## Provide next state
This is the simplest option. Provide the next (full) value for the state.
```ts
const getMethods = (setState: SetStateFn<GuestDetailsType>) => ({
  resetDetails() {
    setState({ ...defaultGuest })
  }
})
```
Besides plain object based states, Muestate also supports primitive data types like `number` and `string`. In such cases, the value can be set directly.
```ts
const getMethods = (setState: SetStateFn<number>) => ({
  update(value: number) {
    setState(value)
  }
})
```

## Provide partial state
Use this option for flat pure object states.
```ts
const getMethods = (setState: SetStateFn<GuestDetailsType>) => ({
  updateName(firstName: string, lastName?: string) {
    setState({ name: `${firstName}${lastName ? ' ' + lastName : ''}` });
  }
})
```
There are two gothcas to be aware of:
2. Muestate will only apply partial state update (Object spread) for plain objects. Do not use partial updates for non-pure object states. It will break the store state.
1. If the state has nested shape objects, callback state update option would provide better flexibility.

## Provide callback function
This options allows the store method to access the current state value. The return of the callback function must be the full next state value. Typically, we would dwell into object spread hell:
```ts
const getMethods = (setState: SetStateFn<GuestDetailsType>) => ({
  upgradeSuite() {
    setState(prev => ({
      ...prev,
      suit: prev.isVip ? 'Presidential Suite' : 'Executive Suite'
    }))
  }
})
```
But we dont have to. As long as the full state is returned from the callback, Muestate will ensure that the mutable state change is propogated to the reactive UIs.
```ts
const getMethods = (setState: SetStateFn<GuestDetailsType>) => ({
  upgradeSuite() {
    setState(state => {
      state.suit = state.isVip ? 'Presidential Suite' : 'Executive Suite';
      return state;
    })
  }
})
```