import { useRef } from "react";
import type { NotifyFn, ObserverFn, SubscribeFn } from "../types";

export const useMutableSubscription = <StateType>(): [
  SubscribeFn<StateType>,
  NotifyFn<StateType>
] => {
  const observers = useRef<Set<ObserverFn<StateType>>>(new Set());

  const notify = (state: StateType) =>
    observers.current.forEach((observer) => observer(state));

  const subscribe = (observer: ObserverFn<StateType>) => {
    observers.current.add(observer);

    return () => {
      observers.current.delete(observer);
    };
  };

  return [subscribe, notify];
};