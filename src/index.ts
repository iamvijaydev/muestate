export type { DeepPartial, AllowedStateTypes } from "./types";

export { useDefinedContext } from "@/utils/useDefinedContext";
export { useMutableState } from "@/utils/useMutableState";
export { useMutableSubscription } from "@/utils/useMutableSubscription";
export { useReactiveState } from "@/utils/useReactiveState";

export type {
  HelperInstanceType as MutableHelperInstanceType,
  MakeStoreState as MutableMakeStoreState,
} from "@/mutableStore/types";
export { createStore as createMutableStore } from "@/mutableStore/createStore";

export type {
  HelperInstanceType as ReactiveHelperInstanceType,
  MakeStoreState as ReactiveMakeStoreState,
} from "@/reactiveStore/types";
export { createStore as createReactiveStore } from "@/reactiveStore/createStore";

// export type {
//   GetStateFn,
//   SetStateFn,
//   ObserverFn,
//   UnSubscribeFn,
//   SubscribeFn,
//   NotifyFn,
//   NotifyNowFn,
//   MakeStoreMethods,
//   StoreInternals,
//   StateSelectorFn,
//   StateComparatorFn,
// } from "./mutablestore/types";
