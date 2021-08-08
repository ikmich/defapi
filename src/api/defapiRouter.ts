import { Request, Response, Router } from 'express';
import getRawEndpointsController from './controllers/getRawEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import getDefsJsonController from './controllers/getDefsJsonController';
import { ROUTE_DEFS, ROUTE_ENDPOINTS, ROUTE_JSON, ROUTE_MANIFEST, ROUTE_STATUS } from '.';
import configManager from '../common/managers/configManager';
import getManifestController from './controllers/getManifestController';
import getStatusController from './controllers/getStatusController';
import { endpointHook } from './endpointHook';

const defapiRouter = Router();

configManager.processConfig();

// Route: Status check.
defapiRouter.get(ROUTE_STATUS, (req: Request, res: Response) => {
  endpointHook(req, res);
  getStatusController(req, res);
});

// Route: Get list of registered express endpoints.
defapiRouter.get(ROUTE_ENDPOINTS, (req: Request, res: Response) => {
  endpointHook(req, res);
  getRawEndpointsController(req, res);
});

// Route: Generate/update endpoint defs.
defapiRouter.post(ROUTE_DEFS, (req: Request, res: Response) => {
  endpointHook(req, res);
  generateDefsController(req, res, true);
});

// Route: Get endpoint defs json.
defapiRouter.get(ROUTE_JSON, (req: Request, res: Response) => {
  endpointHook(req, res);
  getDefsJsonController(req, res);
});

// Route: Get api manifest.
defapiRouter.get(ROUTE_MANIFEST, (req: Request, res: Response) => {
  endpointHook(req, res);
  getManifestController(req, res);
});

export { defapiRouter };
