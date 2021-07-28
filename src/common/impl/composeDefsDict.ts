import { EndpointDef } from '../../types';
import { composeOutputDef } from './composeOutputDef';
import { _method, _path } from '../defs';

/**
 * Creates object map of EndpointDef keyed by def identifier.
 * @param defs
 */
export function composeDefsDict(defs: EndpointDef[]) {
  const defsDict: { [k: string]: object } = {};
  for (let def of defs) {
    let key = `${_method(def.method)} ${_path(def.path)}`;
    defsDict[key] = composeOutputDef(def);
  }
  return defsDict;
}
