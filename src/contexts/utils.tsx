import {createContext, useContext} from "react";

/**
 * Helper function that ensures contexts are used within a provider - allows for easier type checking
 * @constructor
 */
function ContextFactory<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined) {
      throw new Error("'useCtx must be inside a Provider with a value");
    }
    return c;
  }
  return [useCtx, ctx.Provider] as const; // infer tuple
}

export default ContextFactory;
