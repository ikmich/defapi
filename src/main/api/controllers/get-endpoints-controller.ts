import {Express, Request, Response} from "express";
import {httpSuccess} from "../../../util/_util";
import getEndpoints from "../../lib/get-endpoints";

function getEndpointsController(req: Request, res: Response) {
  const endpoints = getEndpoints(req.app as Express);
  return httpSuccess(res, {
    count: endpoints.length,
    endpoints
  });
}

export default getEndpointsController;
