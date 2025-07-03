import { type Context, useContext } from "react";

export function useDefinedContext<Type>(instance: Context<Type>) {
  const context = useContext<Type>(instance);

  if (context === null || context === undefined) {
    throw new Error(
      "Cannot use 'context' without wrapping the parent with \"Context Provider\"",
    );
  }

  return context;
}
