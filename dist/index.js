export default function nap(func,fetch) {
  if (func.wait) return;
  func.wait = true;

  return fetch()
    .then(res => {
      setTimeout(() => func.wait = false);

      return [null, res];
    })
    .catch(err => {
      setTimeout(() => func.wait = false);

      return [err, undefined];
    });
}