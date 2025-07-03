import { useEffect, useState } from "react";
import type { StateComparatorFn, StateSelectorFn, StoreInternals } from "../types";

export const useReactiveState = <StateType, ReactiveStateType>(
  store: StoreInternals<StateType>,
  rawSelector?: StateSelectorFn<ReactiveStateType, StateType>,
  rawComparator?: StateComparatorFn<ReactiveStateType>
): ReactiveStateType => {
  const defaultSelector = (value: StateType) =>
    structuredClone(value) as unknown as ReactiveStateType;
  const selector = rawSelector ?? defaultSelector;

  const defaultComparator = (oldValue: any, newValue: any) =>
    !Object.is(oldValue, newValue);
  const comparator = rawComparator ?? defaultComparator;

  const [state, setState] = useState<ReactiveStateType>(
    selector(store.internals.getState())
  );

  useEffect(() => {
    let alive = true;
    const onUpdate = (value: any) => {
      if (!alive) {
        return;
      }

      const next = selector(value);

      if (comparator(state, next)) {
        setState(next);
      }
    };
    const unsubscribe = store.internals.subscribe(onUpdate);

    return () => {
      alive = false;
      unsubscribe();
    };
  });

  return state;
};