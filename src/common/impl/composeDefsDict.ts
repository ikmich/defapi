import { EndpointDef } from '../../types';
import { composeDef } from './composeDef';
import { _method, _path } from '../defs';

/**
 * Creates object map of EndpointDef keyed by def identifier.
 * @param defs
 */
export function composeDefsDict(defs: EndpointDef[]) {
  const defsDict: { [k: string]: object } = {};
  for (let def of defs) {
    let key = `${_method(def.method)} ${_path(def.path)}`;
    defsDict[key] = composeDef(def);
  }
  return defsDict;
}
