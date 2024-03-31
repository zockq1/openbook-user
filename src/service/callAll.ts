export default function callAll(...fns: ((...args: any[]) => void)[]) {
  return (...args: any[]) => fns.forEach((fn) => fn && fn(...args));
}
