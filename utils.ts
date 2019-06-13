export function union<T>(xs: Set<T>, ...yss: Set<T>[]) {
  return new Set(
    yss.reduce(
      (acc, set) => acc.filter(n => set.has(n)),
      Array.from(xs)));
}

export function difference<T>(xs: Set<T>, ...yss: Set<T>[]) {
  return new Set(
    yss.reduce(
      (acc, set) => acc.filter(n => !set.has(n)),
      Array.from(xs)));
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function range(n: number) {
  return Array.from({length: n}, (value, key) => key);
}
