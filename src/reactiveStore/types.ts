import { PropsWithChildren, Dispatch, SetStateAction, JSX } from "react";
import type { DeepPartial, AllowedStateTypes } from "@/types";

export type HelperInstanceType<
  StateType extends AllowedStateTypes,
  HelperType extends object,
> = HelperType & {
  runtimeInitialState?: DeepPartial<StateType>;
};

export type MakeStoreState<
  StateType extends AllowedStateTypes,
  HelperType extends object,
> = (helper: HelperInstanceType<StateType, HelperType>) => StateType;

export type MakeStoreMethods<
  StateType extends AllowedStateTypes,
  HelperType extends object,
  MethodType extends object,
> = (
  setState: Dispatch<SetStateAction<StateType>>,
  helper: HelperInstanceType<StateType, HelperType>,
) => MethodType;

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

export type UseStore<
  StateType extends AllowedStateTypes,
  MethodsType extends object,
> = { state: StateType } & MethodsType;

export type ContextStore<
  StateType extends AllowedStateTypes,
  MethodsType extends object,
> = {
  store: UseStore<StateType, MethodsType>;
};

export type UseStoreContext<
  StateType extends AllowedStateTypes,
  MethodsType extends object,
> = () => ContextStore<StateType, MethodsType>;

export type ContextProviderType<StateType extends AllowedStateTypes> = (
  props: PropsWithChildren<{ runtimeInitialState?: DeepPartial<StateType> }>,
) => JSX.Element;

export type StoreInstance<
  StateType extends AllowedStateTypes,
  MethodsType extends object,
> = [UseStoreContext<StateType, MethodsType>, ContextProviderType<StateType>];
