import { Request, Response, Router } from "express";
import {
  API_PATH_ENDPOINTS,
  API_PATH_ENDPOINTS_DL,
  API_PATH_INIT,
  API_PATH_MANIFEST,
} from "../constants";
import getEndpointsCtrl from "./controllers/getEndpoints.ctrl";
import initDefsCtrl from "./controllers/initDefs.ctrl";

const defapiRouter = Router();

defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  return getEndpointsCtrl(req, res);
});

defapiRouter.post(API_PATH_MANIFEST, (req: Request, res: Response) => {
  //return generateManifestCtrl(req, res);
  res.status(501).json({
    message: "Not implemented",
  });
});

defapiRouter.post(API_PATH_INIT, (req: Request, res: Response) => {
  return initDefsCtrl(req, res, false);
});

defapiRouter.patch(API_PATH_INIT, (req: Request, res: Response) => {
  return initDefsCtrl(req, res, true);
});

defapiRouter.get(API_PATH_ENDPOINTS_DL, (req: Request, res: Response) => {
  //return dlEndpointsCtrl(req, res);
  res.status(501).json({
    message: "Not implemented",
  });
});

export { defapiRouter };
