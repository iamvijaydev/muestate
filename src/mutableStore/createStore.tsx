import React, { createContext, PropsWithChildren, JSX } from "react";

import { useDefinedContext } from "@/utils/useDefinedContext";
import { useReactiveState } from "@/mutableStore/utils/useReactiveState";
import { useMutableState } from "@/mutableStore/utils/useMutableState";
import { useMutableSubscription } from "@/mutableStore/utils/useMutableSubscription";
import type {
  HelperInstanceType,
  CreateStoreArgs,
  StoreInternals,
  UseStoreContext,
  UseStoreState,
  StoreInstance,
  StateSelectorFn,
  StateComparatorFn,
} from "@/mutableStore/types";
import type { DeepPartial, AllowedStateTypes } from "@/types";

export function createStore<
  StateType extends AllowedStateTypes,
  MethodType extends object,
  HelpersType extends object,
>({
  makeInitialState,
  makeMethods,
  makeHelper,
  providerName,
}: CreateStoreArgs<StateType, MethodType, HelpersType>): StoreInstance<
  StateType,
  MethodType
> {
  const useStore = (
    runtimeInitialState?: DeepPartial<StateType>,
  ): StoreInternals<StateType> & MethodType => {
    let helper: HelperInstanceType<StateType, HelpersType> = {
      notifyNow: () => { /* noop */ },
      runtimeInitialState,
    } as HelperInstanceType<StateType, HelpersType>;

    if (typeof makeHelper === "function") {
      helper = {
        ...makeHelper(),
        ...helper,
      };
    }

    let initialState: StateType;

    if (typeof makeInitialState === "function") {
      initialState = makeInitialState(helper);
    } else {
      initialState = makeInitialState as StateType;
    }

    const [, getState, setState] = useMutableState<StateType>(
      structuredClone(initialState),
    );
    const [subscribe, notify] = useMutableSubscription<StateType>();

    helper.notifyNow = () => {
      notify(getState());
    };

    return {
      $internals: {
        getState,
        subscribe,
        notify,
      },
      ...Object.entries(makeMethods(setState, helper)).reduce(
        (acc, [key, fn]) => {
          if (key === "$internals") {
            throw 'Store method cannot be named "$internals". Its reserved for internal store methods.';
          }

          (acc as any)[key] = async (...args: any[]) => {
            await fn(...args);
            helper.notifyNow();
          };

          return acc;
        },
        {} as MethodType,
      ),
    };
  };

  const Context = createContext<ReturnType<typeof useStore> | undefined>(
    undefined,
  );

  const useContextStore: UseStoreContext<
    StateType,
    MethodType
  > = (): StoreInternals<StateType> & MethodType => {
    return useDefinedContext(Context, providerName);
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

  function ContextProvider(
    props: PropsWithChildren<{ runtimeInitialState?: DeepPartial<StateType> }>,
  ): JSX.Element {
    const store = useStore(props.runtimeInitialState);

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  }

  if (providerName) {
    Context.displayName = providerName;
  }

  return [useContextStore, useStoreState, ContextProvider];
}
