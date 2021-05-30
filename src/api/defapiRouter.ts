import { Request, Response, Router } from 'express';
import getEndpointsController from './controllers/getEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import getDefsJsonController from './controllers/getDefsJsonController';
import { API_PATH_DOCS, API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS, API_PATH_GET_JSON } from '.';
import configManager from '../common/managers/configManager';
import { viewDocsController } from './controllers/viewDocsController';
import { endpointHook } from '../common/endpointHook';

const defapiRouter = Router();

/*
 * Check for defapi-config.js in the project root.
 */
configManager.checkConfig();

configManager.importConfig();

// Route: Get list of registered express endpoints.
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  endpointHook(req, res);
  getEndpointsController(req, res);
});

// Route: Generate/update endpoint defs.
defapiRouter.post(API_PATH_GENERATE_DEFS, (req: Request, res: Response) => {
  endpointHook(req, res);
  generateDefsController(req, res, true);
});

// Route: Get/render endpoint defs json.
defapiRouter.get(API_PATH_GET_JSON, (req: Request, res: Response) => {
  endpointHook(req, res);
  getDefsJsonController(req, res);
});

// Route: Get/render endpoint defs html docs.
defapiRouter.get(API_PATH_DOCS, (req: Request, res: Response) => {
  endpointHook(req, res);
  viewDocsController(req, res);
});

export { defapiRouter };
