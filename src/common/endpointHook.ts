import { Request, Response } from 'express';
import configManager from './managers/configManager';
import { htmlClientManager } from './managers/htmlClientManager';

/**
 * Function to execute on every defapi endpoint call. It is typically used to capture the baseUri of the api, and to
 * populate the .env file of the html client.
 * @param req
 * @param res
 */
export function endpointHook(req: Request, res: Response) {
  let config = Object.assign({}, configManager.getConfig());
  let baseUri = req.get('Host') ?? '';
  htmlClientManager.updateEnv({
    REACT_APP_API_TITLE: config.api.title ?? '',
    REACT_APP_API_BASE_URI: baseUri,
    REACT_APP_API_DEFAULT_HEADERS: config.api.defaultHeaders ? JSON.stringify(config.api.defaultHeaders) : ''
  });

  // Todo - continue
}
