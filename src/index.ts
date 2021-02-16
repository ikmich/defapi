import {Express} from "express";
import {ApidefConfig} from "./api/meta";
import {DEFAULT_SRC_PATH, SETTING_BASE_URI, SETTING_SRC_PATH,} from "./constants";
import {apidefRouter} from "./api/apidef-router";
import configUtil from "./util/config-util";
import {yes} from "./util/_util";

/**
 * Register your express app instance with apidef routes.
 * @param app
 * @param opts If not provided, the values in apidef-config.json are used; otherwise, this parameter takes precedence.
 */
function register(app: Express, opts?: ApidefConfig) {
  if (opts && yes(opts?.baseUri)) {
    app.set(SETTING_BASE_URI, opts?.baseUri);
  } else {
    app.set(SETTING_BASE_URI, configUtil.getPropBaseUri());
  }

  if (opts && yes(opts?.srcPath)) {
    app.set(SETTING_SRC_PATH, opts?.srcPath ?? DEFAULT_SRC_PATH);
  } else {
    app.set(SETTING_SRC_PATH, configUtil.getPropSrcPath());
  }

  app.use(apidefRouter);
}


const apidef = {
  register,
};

export default apidef;
