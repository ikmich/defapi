import { Request, Response, Router } from 'express';
import { API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS, API_PATH_UPDATE_DEFS } from '../constants';
import getEndpointsController from './controllers/get-endpoints-controller';
import initDefsController from './controllers/init-defs-controller';

const defapiRouter = Router();

/**
 * Get list of registered endpoints
 */
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  return getEndpointsController(req, res);
});

// defapiRouter.post(API_PATH_MANIFEST, (req: Request, res: Response) => {
//   //return generateManifestController(req, res);
//   res.status(501).json({
//     message: "Not implemented",
//   });
// });

/**
 * Generate initial endpoint defs
 */
defapiRouter.post(API_PATH_GENERATE_DEFS, (req: Request, res: Response) => {
  return initDefsController(req, res, false);
});

/**
 * Update endpoint defs
 */
defapiRouter.post(API_PATH_UPDATE_DEFS, (req: Request, res: Response) => {
  return initDefsController(req, res, true);
});

// defapiRouter.get(API_PATH_ENDPOINTS_DL, (req: Request, res: Response) => {
//   //return dlEndpointsController(req, res);
//   res.status(501).json({
//     message: "Not implemented",
//   });
// });

export { defapiRouter };
