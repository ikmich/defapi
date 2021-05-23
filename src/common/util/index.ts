export function yes(o: any) {
  if (typeof 0 === 'boolean') {
    return o;
  }

  let b = o !== undefined && o !== null;
  if (b && typeof o === 'string') {
    b = b && o !== '';
  }

  return b;
}

export function no(o: any) {
  return !yes(o);
}

export function ifdev(f: () => any) {
  if (process.env.NODE_ENV === 'development') {
    f();
  }
}

const _util = {
  fn(f?: () => any) {
    if (f) {
      return f();
    }
  },
  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, ms);
    });
  },
  noSpace(s: string) {
    return s.replace(/\s+/g, '');
  }
};

export default _util;
