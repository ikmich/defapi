import {Request, Response, Router} from "express";
import {API_PATH_DOCAPI, API_PATH_ENDPOINTS, API_PATH_ENDPOINTS_DL} from "../../constants";
import getEndpointsController from "./controllers/get-endpoints-controller";
import postDocapiController from "./controllers/post-docapi-controller";
import downloadEndpointsController from "./controllers/download-endpoints-controller";

const docapiRouter = Router();

docapiRouter.get(API_PATH_ENDPOINTS, (req, res) => {
  return getEndpointsController(req, res);
});

docapiRouter.post(API_PATH_DOCAPI, (req: Request, res: Response) => {
  return postDocapiController(req, res);
});

docapiRouter.get(API_PATH_ENDPOINTS_DL, (req:Request, res:Response) => {
  return downloadEndpointsController(req, res);
});

export default docapiRouter;
