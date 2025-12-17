export type { DeepPartial, AllowedStateTypes } from "@/types";
export { isPlainObject } from "@/utils/isPlainObject";
export { useDefinedContext } from "@/utils/useDefinedContext";

export type {
  HelperInstanceType as MutableHelperInstanceType,
  MakeStoreState as MutableMakeStoreState,
} from "@/mutableStore/types";
export { createStore as createMutableStore } from "@/mutableStore/createStore";
export { useMutableState } from "@/mutableStore/utils/useMutableState";
export { useMutableSubscription } from "@/mutableStore/utils/useMutableSubscription";
export { useReactiveState } from "@/mutableStore/utils/useReactiveState";

export type {
  HelperInstanceType as ReactiveHelperInstanceType,
  MakeStoreState as ReactiveMakeStoreState,
} from "@/reactiveStore/types";
export { createStore as createReactiveStore } from "@/reactiveStore/createStore";

