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
export function getDefDataString(def: EndpointDef, meta?: GenerateDefOptions) {
  def = composeDef(def, meta?.shouldUpdate);
  return JSON.stringify(def, null, 2);
}
