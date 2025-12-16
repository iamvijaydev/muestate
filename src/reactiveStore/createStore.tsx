import React, {
  createContext,
  PropsWithChildren,
  JSX,
  useContext,
  useMemo,
  useState,
} from "react";

import { DeepPartial, AllowedStateTypes } from "@/types";
import type {
  ContextStore,
  CreateStoreArgs,
  HelperInstanceType,
  StoreInstance,
  UseStore,
  UseStoreContext,
} from "./types";
import { useDefinedContext } from "@/utils/useDefinedContext";

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
  ): UseStore<StateType, MethodType> => {
    let helper: HelperInstanceType<StateType, HelpersType> = {
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

    const [state, setState] = useState<StateType>(initialState);

    const methods = useMemo(
      () =>
        Object.entries(makeMethods(setState, helper)).reduce(
          (acc, [key, fn]) => {
            (acc as any)[key] = (...args: any[]) => {
              fn(...args);
            };

            return acc;
          },
          {} as MethodType,
        ),
      [setState],
    );

    return {
      state,
      ...methods,
    };
  };

  const Context = createContext<
    ContextStore<StateType, MethodType> | undefined
  >(undefined);

  const useContextStore: UseStoreContext<StateType, MethodType> = () => {
    return useDefinedContext(Context, providerName);
  };

  function ContextProvider(
    props: PropsWithChildren<{ runtimeInitialState?: DeepPartial<StateType> }>,
  ): JSX.Element {
    const store = useStore(props.runtimeInitialState);

    const value = useMemo(() => ({ store }), [store]);

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  if (providerName) {
    ContextProvider.displayName = providerName;
  }

  return [useContextStore, ContextProvider];
}
