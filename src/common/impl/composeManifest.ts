import { EndpointDef, Manifest } from '../../types';
import { composeDef } from './composeDef';
import { Request } from 'express';
import configManager from '../managers/configManager';
import { getEndpoints } from '../../api';

export function composeManifest(req: Request): Manifest {
  const config = configManager.getConfig();
  const baseUri = config.api.baseUri ? <string>config.api.baseUri : req.get('Host') ?? '';

  const inputDefs = getEndpoints(req.app);
  console.log({inputDefs});

  const defs: EndpointDef[] = [];
  for (let def of inputDefs) {
    const composed = composeDef(def, true);
    defs.push(composed);
  }

  return {
    baseUri,
    title: config.api.title ?? '',
    defaultHeaders: config.api.defaultHeaders,
    defs
  };
}
