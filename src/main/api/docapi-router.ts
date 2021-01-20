import {Request, Response, Router} from "express";
import {API_PATH_DOCAPI, API_PATH_ENDPOINTS} from "../../constants";
import routeGetEndpoints from "./route-get-endpoints";
import routePostDocapi from "./route-post-docapi";

const docapiRouter = Router();

docapiRouter.get(API_PATH_ENDPOINTS, (req, res) => {
  return routeGetEndpoints(req, res);
});

docapiRouter.post(API_PATH_DOCAPI, (req: Request, res: Response) => {
  return routePostDocapi(req, res);
});

export default docapiRouter;
