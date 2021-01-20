import {Express} from "express";
import {API_PATH_ENDPOINTS_DL} from "../../constants";
import getEndpoints from "../lib/get-endpoints";

function routeDownloadEndpoints(app: Express) {
  app.get(API_PATH_ENDPOINTS_DL, (req, res) => {
    const endpoints = getEndpoints(app);
    const json = JSON.stringify(endpoints, null, 2);
    const filename = 'docapi.json';

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(Buffer.from(json));
  });
}

//export default routeDownloadEndpoints;
