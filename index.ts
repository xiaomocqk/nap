interface F extends Function {
  wait: void | boolean
}

/**
 * @param { Promise } promise
 * @return { Promise }
 */
export default function nap<T, U = Error>(
  func: F,
  fetch: () => Promise<T>
): Promise<[U | null, T | undefined]> {
  if (func.wait) return;
  func.wait = true;

  return fetch()
    .then<[null, T]>((res: T) => {
      setTimeout(() => func.wait = false);

      return [null, res];
    })
    .catch<[U, undefined]>(err => {
      setTimeout(() => func.wait = false);

      return [err, undefined];
    });
}