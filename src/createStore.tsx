import React, { createContext, PropsWithChildren, JSX } from "react";

import { useDefinedContext } from "./utils/useDefinedContext";
import { useReactiveState } from "./utils/useReactiveState";
import { useMutableState } from "./utils/useMutableState";
import { useMutableSubscription } from "./utils/useMutableSubscription";
import type {
  MakeStoreMethods,
  StoreInternals,
  UseStoreContext,
  UseStoreState,
  CreateStore,
  NotifyNowFn,
  StateSelectorFn,
  StateComparatorFn,
} from "./types";

export function createStore<StateType, StateMethodType extends object>(
  initialState: StateType,
  makeMethods: MakeStoreMethods<StateType, StateMethodType>,
): CreateStore<StateType, StateMethodType> {
  const useStore = (): StoreInternals<StateType> & StateMethodType => {
    const [, getState, setState] = useMutableState<StateType>(
      structuredClone(initialState),
    );
    const [subscribe, notify] = useMutableSubscription<StateType>();

    const notifyNow: NotifyNowFn = () => {
      notify(getState());
    };

    return {
      internals: {
        getState,
        subscribe,
        notify,
      },
      ...Object.entries(makeMethods(setState, notifyNow)).reduce(
        (acc, [key, fn]) => {
          if (key === "internals") {
            throw 'Store method cannot be named "internals". Its reserved for internal store methods.';
          }

          (acc as any)[key] = (...args: any[]) => {
            fn(...args);
            notifyNow();
          };

          return acc;
        },
        {} as StateMethodType,
      ),
    };
  };

  const Context = createContext<ReturnType<typeof useStore> | undefined>(
    undefined,
  );

  const useContextStore: UseStoreContext<
    StateType,
    StateMethodType
  > = (): StoreInternals<StateType> & StateMethodType => {
    return useDefinedContext(Context);
  };

  const useStoreState: UseStoreState<StateType> = <
    ReactiveStateType = StateType,
  >(
    selector?: StateSelectorFn<ReactiveStateType, StateType>,
    comparator?: StateComparatorFn<ReactiveStateType>,
  ): ReactiveStateType => {
    const store = useContextStore();

    return useReactiveState(store, selector, comparator);
  };

  function ContextProvider(props: PropsWithChildren): JSX.Element {
    const store = useStore();

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  }

  return [useContextStore, useStoreState, ContextProvider];
}
