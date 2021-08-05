import { ApiManifest, EndpointDef } from '../../types';
import { composeOutputDef } from './composeOutputDef';
import configManager from '../managers/configManager';
import { DEFAULT_TITLE } from '../index';

/**
 * Generate api manifest.
 * @param inputDefs
 * @param baseUri
 */
export function generateManifest(inputDefs: EndpointDef[], baseUri: string): ApiManifest {
  const config = configManager.getConfig();

  const defs: EndpointDef[] = [];
  for (let def of inputDefs) {
    defs.push(composeOutputDef(def, true));
  }

  return {
    baseUri,
    title: config.api.title ?? DEFAULT_TITLE,
    headers: config.api.headers,
    authenticationHeaders: config.api.authenticationHeaders,
    endpoints: defs
  };
}
