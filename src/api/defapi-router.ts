import { Request, Response, Router } from 'express';
import { API_PATH_DOCS, API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS } from '../constants';
import getEndpointsController from './controllers/get-endpoints-controller';
import generateDefsController from './controllers/generate-defs-controller';

const defapiRouter = Router();

/**
 * Get list of registered express endpoints
 */
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  return getEndpointsController(req, res);
});

/**
 * Generate/update endpoint defs
 */
defapiRouter.post(API_PATH_GENERATE_DEFS, (req: Request, res: Response) => {
  return generateDefsController(req, res, true);
});

defapiRouter.get(API_PATH_DOCS, (req:Request,res:Response) => {
  
});

export { defapiRouter };
