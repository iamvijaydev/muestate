import { PropsWithChildren, JSX } from "react";

/** Mutable state getter function. Returns readonly snapshot */
export type GetStateFn<StateType> = () => Readonly<StateType>;

/** Mutable state setter function. Accepts partial or full state, or a function that receives the previous state and returns the next state */
export type SetStateFn<StateType> = (
  next: Partial<StateType> | StateType | ((prev: StateType) => StateType),
) => void;

/** State change callback function. Recieves readonly snapshot of state */
export type ObserverFn<StateType> = (state: Readonly<StateType>) => void;

/** Unsubscribe state change callback function. */
export type UnSubscribeFn = () => void;

/** State change subscription function. Accepts state change callback function */
export type SubscribeFn<StateType> = (
  observer: ObserverFn<StateType>,
) => UnSubscribeFn;

/** State change notify function to trigger execution of all subscription callback functions */
export type NotifyFn<StateType> = (state: StateType) => void;

/** Trigger the notify function from different parts */
export type NotifyNowFn = () => void;

/** A store creation function that provides access to the state setter function and notify state change function */
export type MakeStoreMethods<State, Return> = (
  setState: SetStateFn<State>,
  notifyNow: NotifyNowFn,
) => Return;

/** The internals of store that provides access to internal Muestate functions */
export type StoreInternals<State> = {
  internals: {
    getState: GetStateFn<State>;
    subscribe: SubscribeFn<State>;
    notify: NotifyFn<State>;
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
export type UseStoreContext<StateType, StateMethodType> =
  () => StoreInternals<StateType> & StateMethodType;

/** A function that returns the current state of the store, optionally with a reactive, state selector and state comparator */
export type UseStoreState<StateType> = <ReactiveStateType = StateType>(
  selector?: StateSelectorFn<ReactiveStateType, StateType>,
  comparator?: StateComparatorFn<ReactiveStateType>,
) => ReactiveStateType;

/** A React component that wraps the React Context and store initialization */
export type ContextProviderType = (props: PropsWithChildren) => JSX.Element;

/** The return type of the createStore function, which includes the store context, state getter function, and context provider component */
export type CreateStore<StateType, StateMethodType> = [
  UseStoreContext<StateType, StateMethodType>,
  UseStoreState<StateType>,
  ContextProviderType,
];
