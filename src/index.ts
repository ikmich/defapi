import {Express} from "express";
import {DocapiOptions} from "./main/types";
import {DEFAULT_SRC_PATH, SETTING_BASE_URI, SETTING_SRC_PATH} from "./constants";
import docapiRouter from "./main/api/docapi-router";

function register(app: Express, opts?:DocapiOptions) {
  // Set options
  app.set(SETTING_BASE_URI, opts?.base_uri ?? '');
  app.set(SETTING_SRC_PATH, opts?.src_path ?? DEFAULT_SRC_PATH);

  // routeGetEndpoints(app);
  // routeDownloadEndpoints(app);
  // routePostDocapi(app);

  console.log('Setting up docapi endpoints');
  app.use(docapiRouter);
}

const docapi = {
  register
};

export default docapi;
