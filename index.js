const arr = [];

export default function nap(promiseWrap) {
  if (arr.indexOf(promiseWrap) > -1) {
    return ['nap', undefined];
  }

  const idx = arr.push(promiseWrap) - 1;

  return new Promise((resolve, reject) => {
    promiseWrap()
      .then((res) => [null, res])
      .catch((err) => [err, undefined])
      .finally(() => arr.splice(idx, 1));
  });
}
