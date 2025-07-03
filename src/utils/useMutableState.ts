import { RefObject, useRef } from "react";
import { isPlainObject } from "./isPlainObject";
import type { GetStateFn, SetStateFn } from "../types";

export const useMutableState = <StateType>(
  initialState: StateType
): [
  RefObject<StateType>,
  GetStateFn<StateType>,
  SetStateFn<StateType>
] => {
  const state = useRef<StateType>(initialState);

  const getState = (): Readonly<StateType> => state.current;

  const setState = (next: Partial<StateType> | StateType | ((prev: StateType) => StateType)) => {
    if (next instanceof Function) {
      state.current = next(state.current);
      return;
    }

    if (isPlainObject(next)) {
      state.current = {
        ...state.current,
        ...next
      }
      return;
    }

    state.current = next;
  };

  return [state, getState, setState];
};