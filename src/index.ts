import { Express } from "express";
import {
  DEFAULT_SRC_PATH,
  SETTING_BASE_URI,
  SETTING_SRC_PATH,
} from "./constants";
import { apidefRouter } from "./api/apidef-router";
import configUtil from "./util/config-util";
import { yes } from "./util/_util";

export type ObjectOrNull = object | null;
export type StringOrNull = string | null;
export type ArrayOrNull<T> = Array<T> | null;

export interface EndpointDef {
  path: string;
  method: string;
  title?: StringOrNull;
  description?: StringOrNull;
  request?: RequestDef;
  response?: ResponseDef;
  group?: StringOrNull;
}

export type TResponseBody = {
  [k in 'success' | 'ok' | 'fail' | 'error' | string]: object;
} | ObjectOrNull;
export type RequestTypeDef = StringOrNull /*'application/json' | 'multipart/form-data' | 'multipart/url-encoded' | 'text' | null*/;
export type TypeDef = {
  type: string;
  description: string;
  default: any;
} | StringOrNull;
export type ApiManifest = {
  baseUri: string;
  endpoints: Array<EndpointDef>
};
export type RequestDef = {
  type?: StringOrNull;
  query?: ObjectOrNull;
  body?: ObjectOrNull;
  headers?: ObjectOrNull;
  // [k: string]: any;
};
export type ResponseDef = {
  type?: StringOrNull; // mime type
  body?: TResponseBody;
  // [k: string]: any;
};

/**
 * Interface definition for the apidef-config.json file
 */
export interface ApidefConfig {
  baseUri?: string;
  srcPath?: string;
}

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
