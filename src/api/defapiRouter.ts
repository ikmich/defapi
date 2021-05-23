import { Request, Response, Router } from 'express';
import getEndpointsController from './controllers/getEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import getDefsJsonController from './controllers/getDefsJsonController';
import { API_PATH_DOCS, API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS, API_PATH_GET_JSON } from '.';
import configUtil from '../common/util/configUtil';

const defapiRouter = Router();

/*
 * Check for defapi-config.js in the project root.
 */
configUtil.checkConfig();

configUtil.importConfig();

/*
 * Route: Get list of registered express endpoints
 */
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  getEndpointsController(req, res);
});

/*
 * Route: Generate/update endpoint defs
 */
defapiRouter.post(API_PATH_GENERATE_DEFS, (req: Request, res: Response) => {
  generateDefsController(req, res, true);
});

defapiRouter.get(API_PATH_GET_JSON, (req: Request, res: Response) => {
  getDefsJsonController(req, res);
});

defapiRouter.get(API_PATH_DOCS, (req: Request, res: Response) => {
  // todo - docs path
});

export { defapiRouter };
