import { EndpointDef } from '../../types';

/**
 * Normalize endpoint path uri, remove trailing slash.
 * @param path
 */
export function _path(path: string | null): string {
  if (no(path)) return '';
  // remove duplicated slashes
  path = path!.replace(/\/{2,}/g, '/');

  // remove trailing slash(es)
  path = path.replace(/\/+$/g, '');

  // ensure begins with slash
  path = path.replace(/^\/*/, '/');

  return path;
}

export function _baseUri(baseUri: string) {
  // Remove any trailing slashes in base uri
  return baseUri.replace(/\/+$/, '');
}

export function _method(method: string): string {
  return method.toUpperCase();
}

export function _def(def: EndpointDef): EndpointDef {
  return {
    ...def,
    path: _path(def.path),
    method: _method(def.method)
  };
}

export function _defId(def: EndpointDef): string {
  let pathStub = def.path.replace(/\//g, '>');
  pathStub = pathStub.replace(/:/g, '@');
  return `${def.method}>${pathStub}`;
}

export function _defFilename(def: EndpointDef): string {
  return `${_defId(def)}.json`;
}

// ----

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
