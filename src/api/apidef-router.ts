import { Request, Response, Router } from "express";
import {
  API_PATH_ENDPOINTS,
  API_PATH_ENDPOINTS_DL,
  API_PATH_INIT,
  API_PATH_MANIFEST,
} from "../constants";
import getEndpointsRequestHandler from "./request-handlers/getEndpoints.request-handler";
import initDefsRequestHandler from "./request-handlers/initDefs.request-handler";

const apidefRouter = Router();

apidefRouter.get(API_PATH_ENDPOINTS, (req:Request, res:Response) => {
  return getEndpointsRequestHandler(req, res);
});

apidefRouter.post(API_PATH_MANIFEST, (req: Request, res: Response) => {
  //return generateManifestRequestHandler(req, res);
  res.status(501).json({
    message: "Not implemented",
  });
});

apidefRouter.post(API_PATH_INIT, (req: Request, res: Response) => {
  return initDefsRequestHandler(req, res);
});

apidefRouter.get(API_PATH_ENDPOINTS_DL, (req: Request, res: Response) => {
  //return dlEndpointsRequestHandler(req, res);
  res.status(501).json({
    message: "Not implemented",
  });
});

export { apidefRouter };
