import { Request, Response, Router } from "express";
import {
  API_PATH_MANIFEST,
  API_PATH_ENDPOINTS,
  API_PATH_ENDPOINTS_DL, API_PATH_INIT,
} from "../constants";
import getEndpointsRequestHandler from "./request-handlers/getEndpointsRequestHandler";
import generateManifestRequestHandler from "./request-handlers/generateManifestRequestHandler";
import dlEndpointsRequestHandler from "./request-handlers/dlEndpointsRequestHandler";
import initDefsRequestHandler from "./request-handlers/initDefsRequestHandler";

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
