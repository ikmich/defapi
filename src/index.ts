import { Express } from "express";
import { ApidefOptions } from "./api/meta";
import {
  DEFAULT_SRC_PATH,
  SETTING_BASE_URI,
  SETTING_SRC_PATH,
} from "./constants";
import { apidefRouter } from "./api/apidef-router";
import configUtil from "./util/config-util";

/**
 * Register your express app instance with apidef routes.
 * @param app
 * @param opts If not provided, the values in apidef-config.json are used; otherwise, this parameter takes precedence.
 */
function register(app: Express, opts?: ApidefOptions) {
  // Set options
  // if (opts) {
  //   app.set(SETTING_BASE_URI, opts?.base_uri ?? '');
  //   app.set(SETTING_SRC_PATH, opts?.src_path ?? DEFAULT_SRC_PATH);
  // } else {
  //   // read from apidef-config
  //   app.set(SETTING_BASE_URI, configUtil.getPropBaseUri());
  //   app.set(SETTING_SRC_PATH, configUtil.getPropSrcPath());
  // }
  //
  if (opts && opts?.base_uri) {
    app.set(SETTING_BASE_URI, opts?.base_uri ?? "");
  } else {
    app.set(SETTING_BASE_URI, configUtil.getPropBaseUri());
  }

  if (opts && opts?.src_path) {
    app.set(SETTING_SRC_PATH, opts?.src_path ?? DEFAULT_SRC_PATH);
  } else {
    app.set(SETTING_SRC_PATH, configUtil.getPropSrcPath());
  }

  app.use(apidefRouter);
}

const apidef = {
  register,
};

export default apidef;
