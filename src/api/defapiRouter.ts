import { Request, Response, Router } from 'express';
import getRawEndpointsController from './controllers/getRawEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import getDefsJsonController from './controllers/getDefsJsonController';
import {
  API_PATH_ENDPOINTS,
  API_PATH_DEFS,
  API_PATH_JSON,
  API_PATH_MANIFEST,
  API_PATH_STATUS
} from '.';
import configManager from '../common/managers/configManager';
import getManifestController from './controllers/getManifestController';
import getStatusController from './controllers/getStatusController';

const defapiRouter = Router();

configManager.processConfig();

// Route: Status check.
defapiRouter.get(API_PATH_STATUS, (req: Request, res: Response) => {
  getStatusController(req, res);
});

// Route: Get list of registered express endpoints.
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  getRawEndpointsController(req, res);
});

// Route: Generate/update endpoint defs.
defapiRouter.post(API_PATH_DEFS, (req: Request, res: Response) => {
  generateDefsController(req, res, true);
});

// Route: Get endpoint defs json.
defapiRouter.get(API_PATH_JSON, (req: Request, res: Response) => {
  getDefsJsonController(req, res);
});

// Route: Get api manifest.
defapiRouter.get(API_PATH_MANIFEST, (req: Request, res: Response) => {
  getManifestController(req, res);
});

// // Route: Render endpoint defs html docs.
// defapiRouter.get(API_PATH_HTML_VIEW, async (req: Request, res: Response) => {
//   await viewDocsController(req, res);
// });

export { defapiRouter };
