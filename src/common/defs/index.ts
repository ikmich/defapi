import {EndpointDef} from "../../types";
import {no} from "../util";

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
