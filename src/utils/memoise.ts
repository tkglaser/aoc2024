type AnyFunction = (...args: readonly any[]) => unknown;

export function memoise<Fn extends AnyFunction>(fn: Fn): Fn {
  const cache: Record<string, ReturnType<Fn>> = {};

  const memoised = (...n: Parameters<Fn>): ReturnType<Fn> => {
    const key = JSON.stringify(n);
    if (typeof cache[key] !== "undefined") {
      return cache[key];
    }
    const result = fn(...n) as ReturnType<Fn>;
    cache[key] = result;
    return result;
  };

  return memoised as Fn;
}
