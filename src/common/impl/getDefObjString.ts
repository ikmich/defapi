import { EndpointDef } from '../../types';
import { composeDef } from './composeDef';

export type GenerateDefOptions = {
  shouldUpdate?: boolean;
};

/**
 * Generates string contents for an endpoint def.
 * @param {EndpointDef} def
 * @param meta
 */
export function getDefObjString(def: EndpointDef, meta?: GenerateDefOptions) {
  const _def = composeDef(def, meta?.shouldUpdate);
  return JSON.stringify(_def, null, 2);
}
