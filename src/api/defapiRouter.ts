import { Request, Response, Router } from 'express';
import getEndpointsController from './controllers/getEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import getDefsJsonController from './controllers/getDefsJsonController';
import { API_PATH_DOCS, API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS, API_PATH_GET_JSON, API_PATH_GET_MANIFEST } from '.';
import configManager from '../common/managers/configManager';
import { viewDocsController } from './controllers/viewDocsController';
import { endpointHook } from './endpointHook';
import getManifestController from './controllers/getManifestController';

const defapiRouter = Router();

configManager.processConfig();

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

// Route: Get endpoint defs json.
defapiRouter.get(API_PATH_GET_JSON, (req: Request, res: Response) => {
  endpointHook(req, res);
  getDefsJsonController(req, res);
});

// Route: Get api manifest.
defapiRouter.get(API_PATH_GET_MANIFEST, (req: Request, res: Response) => {
  endpointHook(req, res);
  getManifestController(req, res);
});

// Route: Render endpoint defs html docs.
defapiRouter.get(API_PATH_DOCS, async (req: Request, res: Response) => {
  endpointHook(req, res);
  await viewDocsController(req, res);
});

export { defapiRouter };
