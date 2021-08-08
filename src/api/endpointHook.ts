import { Request, Response } from 'express';
import configManager from '../common/managers/configManager';
import { store } from '../common/util/store';
import { STOREKEY_DEFAPI_CONFIG } from '../common';

export function endpointHook(req: Request, res: Response) {
  let config = configManager.getConfig();
  store.save(STOREKEY_DEFAPI_CONFIG, config);
  store.save('host', req.get('Host') || 'http://localhost');
}
