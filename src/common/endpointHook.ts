import { Request, Response } from 'express';
import configManager from './managers/configManager';
import { store } from './util/store';
import { STORE_API_CONFIG } from './index';

/**
 * Function to execute on every defapi endpoint call. It is typically used to capture the baseUri of the api, and to
 * populate the .env file of the html client.
 * @param req
 * @param res
 */
export function endpointHook(req: Request, res: Response) {
  let config = Object.assign({}, configManager.getConfig());
  config.api.baseUri = req.get('Host') ?? '';
  store.save(STORE_API_CONFIG, config.api);
}
