const arr = [];

export default function nap(promise, signId) {
  let idx = -1;

  if (arguments.length > 1 && arr.indexOf(signId) > -1) {
    idx = arr.push(signId) - 1;
    return ['nap', undefined];
  }

  return promise
    .then((res) => [null, res])
    .catch((err) => [err, undefined])
    .finally(() => idx > -1 && arr.splice(idx, 1));
}
