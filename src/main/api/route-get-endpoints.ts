import {Express, NextFunction, Request, Response} from "express";
import {API_PATH_ENDPOINTS} from "../../constants";
import {httpSuccess} from "../../util/_util";
import getEndpoints from "../lib/get-endpoints";

// function routeGetEndpoints(app: Express) {
//   app.get(API_PATH_ENDPOINTS, (req, res) => {
//     const endpoints = getEndpoints(app);
//     return httpSuccess(res, {
//       count: endpoints.length,
//       endpoints
//     });
//   });
// }

function routeGetEndpoints(req:Request, res:Response) {
  const endpoints = getEndpoints(req.app as Express);
  return httpSuccess(res, {
    count: endpoints.length,
    endpoints
  });
}

export default routeGetEndpoints;
