import { Express } from "express";
import { CONFIG_FILENAME } from "./constants";
import { defapiRouter } from "./api/defapi-router";
import fileUtil from "./util/file-util";
import * as FS from "fs-extra";
import { DefapiError } from "./errors";

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

export type TResponseDef =
  | { [k: string]: TResponseBody }
  | TResponseBody
  | null;

export type TResponseBody =
  | {
      [k: string]: DataDef;
    }
  | null;

export type DataDef =
  | {
      type: string;
      description: string;
      default: any;
    }
  | StringOrNull;

export type ApiManifest = {
  baseUri: string;
  endpoints: Array<EndpointDef>;
};

export type RequestDef = {
  type?: StringOrNull;
  query?: ObjectOrNull;
  body?: ObjectOrNull;
  headers?: ObjectOrNull;
  [k: string]: any;
};

export type ResponseDef = {
  type?: StringOrNull;
  body?: TResponseBody;
  [k: string]: any;
};

/**
 * Interface definition for the defapi-config.json file
 */
export interface DefapiConfig {
  baseUri?: string;
  srcPath?: string;
}

// ----

/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function register(app: Express) {
  const configPath = fileUtil.getConfigPath();
  if (!FS.existsSync(configPath)) {
    throw new DefapiError(
      `${CONFIG_FILENAME} file not found. Run \`defapi config\` from your project root to create a config file.`
    );
  }

  app.use(defapiRouter);
}

const defapi = {
  register,
};

export default defapi;
