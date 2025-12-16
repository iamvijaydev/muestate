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