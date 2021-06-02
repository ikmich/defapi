import { EndpointDef } from '../../types';
import { composeDef } from './composeDef';

export type GenerateDefOptions = {
  shouldUpdate?: boolean;
};

/**
 * Generates string contents for an endpoint def.
 * @param {EndpointDef} inputDef
 * @param meta
 */
export function defObjToString(inputDef: EndpointDef, meta?: GenerateDefOptions) {
  const output = composeDef(inputDef, meta?.shouldUpdate);
  return JSON.stringify(output, null, 2);
}
