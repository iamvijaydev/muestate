import { PropsWithChildren, JSX } from "react";
import type { DeepPartial, AllowedStateTypes } from "@/types";
import type {
  GetStateFn,
  SetStateFn,
  SubscribeFn,
  NotifyFn,
  NotifyNowFn,
} from "@/mutableStore/utils/types";

export type HelperInstanceType<
  StateType extends AllowedStateTypes,
  HelpersType extends object,
> = HelpersType & {
  notifyNow: NotifyNowFn;
  runtimeInitialState?: DeepPartial<StateType>;
};

export type MakeStoreState<
  StateType extends AllowedStateTypes,
  HelpersType extends object,
> = (helper: HelperInstanceType<StateType, HelpersType>) => StateType;

/** A store creation function that provides access to the state setter function and notify state change function */
export type MakeStoreMethods<
  StateType extends AllowedStateTypes,
  HelpersType extends object,
  MethodsType extends object,
> = (
  setState: SetStateFn<StateType>,
  helper: HelperInstanceType<StateType, HelpersType>,
) => MethodsType;

export type MakeStoreHelper<HelpersType extends object> = () => HelpersType;

export type CreateStoreArgs<
  StateType extends AllowedStateTypes,
  MethodsType extends object,
  HelpersType extends object,
> = {
  makeInitialState: StateType | MakeStoreState<StateType, HelpersType>;
  makeMethods: MakeStoreMethods<StateType, HelpersType, MethodsType>;
  makeHelper?: MakeStoreHelper<HelpersType>;
  providerName?: string;
};

/** The internals of store that provides access to internal Muestate functions */
export type StoreInternals<StateType> = {
  $internals: {
    getState: GetStateFn<StateType>;
    subscribe: SubscribeFn<StateType>;
    notify: NotifyFn<StateType>;
  };
};

/** A state selector function that can convert the mutable state to reactive state  */
export type StateSelectorFn<ReactiveStateType, StateType> = (
  value: StateType,
) => ReactiveStateType;

/** A function that compares old and new reactive state values to determine if a value change is required */
export type StateComparatorFn<ReactiveStateType> = (
  oldValue: ReactiveStateType,
  newValue: ReactiveStateType,
) => boolean;

/** The React Context with the store as its value */
export type UseStoreContext<StateType, MethodsType> =
  () => StoreInternals<StateType> & MethodsType;

/** A function that returns the current state of the store, optionally with a reactive, state selector and state comparator */
export type UseStoreState<StateType> = <ReactiveStateType = StateType>(
  selector?: StateSelectorFn<ReactiveStateType, StateType>,
  comparator?: StateComparatorFn<ReactiveStateType>,
) => ReactiveStateType;

/** A React component that wraps the React Context and store initialization */
export type ContextProviderType<StateType> = (
  props: PropsWithChildren<{ runtimeInitialState?: DeepPartial<StateType> }>,
) => JSX.Element;

/** The return type of the createStore function, which includes the store context, state getter function, and context provider component */
export type StoreInstance<StateType, MethodsType> = [
  UseStoreContext<StateType, MethodsType>,
  UseStoreState<StateType>,
  ContextProviderType<StateType>,
];
