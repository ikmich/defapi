import { Response } from 'express';
import { HttpError } from '../errors';
import slugify from 'slugify';
import { EndpointDef } from '../../types';

export const httpSuccess = (res: Response, data?: any, message?: string) => {
  let body: any = {
    status: 'success'
  };

  if (data) {
    body.data = data;
  }

  if (message) {
    body.message = message;
  }

  res.status(200).json(body);
};

export const httpFail = (res: Response, error: string | Error | HttpError, httpCode?: number | null, data?: any) => {
  let body: any = {
    status: 'fail',
    message: typeof error === 'string' ? error : error.message
  };

  if (data) {
    body.data = data;
  }

  if (error instanceof HttpError) {
    httpCode = error.statusCode;
  }

  if (!httpCode) {
    httpCode = 500;
  }

  res.status(httpCode).json(body);
};

/**
 * Normalize path, remove trailing slash.
 * @param path
 */
export function _path(path: string | null): string {
  if (!path) return '';
  // remove duplicated slashes
  path = path.replace(/\/{2,}/g, '/');

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

export function _defIdentity(def: EndpointDef): string {
  return `${def.method.toLowerCase()}>>${def.path}`;
}

export function getDefFileTitle(def: EndpointDef): string {
  let pathStub = def.path.replace(/\//g, '>');
  pathStub = pathStub.replace(/:/g, '@');
  return `${def.method}>${pathStub}`;
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

export function arrayContains(haystack: any[], needle: any): boolean {
  return haystack.indexOf(needle) > -1;
}

export function arrayContainsAnyOf(haystack: any[], needles: any[]): boolean {
  for (let item of haystack) {
    if (haystack.indexOf(item) > -1) {
      return true;
    }
  }
  return false;
}

export function isEmpty(subject: any): boolean {
  if (no(subject)) {
    return true;
  }

  switch (true) {
    case typeof subject === 'string':
      return no(subject);
    case Array.isArray(subject):
      return subject.length === 0;
    case typeof subject === 'object':
      return Object.keys(subject).length === 0;
    case typeof subject === 'number':
      return subject === 0;
    default:
      return no(subject);
  }
}

export function _wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export function _slug(s: string) {
  return slugify(s, {
    lower: true,
    replacement: '-'
  });
}

export function _noSpace(s: string) {
  return s.replace(/\s+/g, '');
}

const ut = {
  fn(f?: () => any) {
    if (f) {
      return f();
    }
  }
};

export default ut;
