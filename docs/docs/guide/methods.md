## Understanding methods in Muestate
The `createStore` expects a `getMethod` function which should use the `setState` function to set the state changes. There are a couple of ways store methods can update the state. `getMethod` function will recieve two arguments to manage state updates:
1. `setState` function: update the internal mutable state
2. `notifyNow` function: for async state update notify state update to subscribers (more on that later)

### Return full state
```ts
const getMethods = (setState: SetStateFn<UserState>) => ({
  resetUser() {
    setState({ ...initialState })
  },
})
```

### Return partial state
```ts
const getMethods = (setState: SetStateFn<FilterState>) => ({
  setQuery(value: string = "") {
    setState({ query: value })
  },
})
```

### Return callback function
```ts
const getMethods = (setState: SetStateFn<ProductListState>) => ({
  startFetch({ pageNo, perPage }: FetchArgs = {}) {
    setState((prev) => ({
      ...prev,
      pageNo: pageNo ?? prev.pageNo,
      perPage: perPage ?? prev.perPage,
      isPending: true,
      isError: false,
    }))
  },
  // actual fetching happens outside in a command/hook
  cancelFetch() {
    setState({ isPending: false, })
  }
  finishFetch(isError: boolean, res?: ApiRes) {
    setState({
      isPending: false,
      isError,
      data: res?.data ?? [],
      totalCount: res?.data ?? 0,
    })
  },
})
```

### Manage async action within method
```ts
const getMethods = (setState: SetStateFn<ProductListState>, notifyNow: NotifyNowFn) => ({
  async fetchProducts({ pageNo, perPage }: FetchArgs = {}) {
    setState((prev) => ({
      ...prev,
      isPending: true,
      isError: false,
      pageNo: pageNo ?? prev.pageNo,
      perPage: perPage ?? prev.perPage,
    }))
    notifyNow() // notify the state change subscription; forcing a re-render, show the loading UI

    try {
      const { data, totalCount } = await fetch(...)

      setState({
        data,
        totalCount,
        isPending: false,
        isError: false,
      })
    } catch (error) {
      setState({
        data: [],
        totalCount: 0,
        isPending: false,
        isError: true,
      })
    }
  }
})
```