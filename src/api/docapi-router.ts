import { Request, Response, Router } from "express";
import {
  API_PATH_MANIFEST,
  API_PATH_ENDPOINTS,
  API_PATH_ENDPOINTS_DL, API_PATH_INIT,
} from "../constants";
import getEndpointsRequestHandler from "./controllers/getEndpointsRequestHandler";
import generateManifestRequestHandler from "./controllers/generateManifestRequestHandler";
import dlEndpointsRequestHandler from "./controllers/dlEndpointsRequestHandler";
import initDefsRequestHandler from "./controllers/initDefsRequestHandler";

const docapiRouter = Router();

docapiRouter.get(API_PATH_ENDPOINTS, (req, res) => {
  return getEndpointsRequestHandler(req, res);
});

docapiRouter.post(API_PATH_MANIFEST, (req: Request, res: Response) => {
  return generateManifestRequestHandler(req, res);
});

docapiRouter.post(API_PATH_INIT, (req:Request, res:Response) => {
  return initDefsRequestHandler(req, res);
});

docapiRouter.get(API_PATH_ENDPOINTS_DL, (req: Request, res: Response) => {
  return dlEndpointsRequestHandler(req, res);
});

export { docapiRouter };
