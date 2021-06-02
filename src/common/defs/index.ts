import { EndpointDef } from '../../types';
import { no } from '../util';

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
  let output = {
    ...def,
    path: _path(def.path),
    method: _method(def.method)
  };

  if (!def.title || def.title === '') {
    output['title'] = _defaultTitle(output);
  } else {
    output['title'] = def.title;
  }
  return output;
}

export function _defId(def: EndpointDef): string {
  let pathStub = def.path.replace(/\//g, '>');
  pathStub = pathStub.replace(/:/g, '@');
  return `${def.method}>${pathStub}`;
}

export function _defFilename(def: EndpointDef): string {
  return `${_defId(def)}.json`;
}

export function _defaultTitle(def: EndpointDef) {
  return `${def.method.toUpperCase()} ${def.path}`;
}

export function filterDefs(search: string, defs: EndpointDef[]): EndpointDef[] {
  if (search && search.length) {
    defs = defs.filter((def) => {
      return (
        def.title?.toLowerCase().includes(search) ||
        def.path.toLowerCase().includes(search) ||
        def.description?.toLowerCase().includes(search)
      );
    });
  }
  return defs;
}
