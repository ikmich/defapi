import { Express } from 'express';
import { CONFIG_FILENAME } from './constants';
import { defapiRouter } from './api/defapi-router';
import fileUtil from './util/file-util';
import * as FS from 'fs-extra';
import { DefapiError } from './errors';

export type Objectx = object | null | undefined;
export type Stringx = string | null | undefined;
export type Arrayx<T> = Array<T> | null | undefined;

export interface EndpointDef {
  path: string;
  method: string;
  title?: Stringx;
  description?: Stringx;
  request?: RequestDef;
  response?: ResponseDef;
  group?: Stringx;
}

export type TResponseBodyDef = { [k: string]: TResponseBody } | TResponseBody | null;

export type TResponseBody = {
  [k: string]: TypeDef;
} | null;

export type TypeDef =
  | {
      type: string;
      description?: string;
      defaultValue?: any;
      options?: any[];
    }
  | Stringx;

export type ApiManifest = {
  baseUri: string;
  endpoints: Array<EndpointDef>;
};

export type RequestDef = {
  type?: Stringx;
  query?: Objectx;
  body?: Objectx;
  headers?: Objectx;
  [k: string]: any;
};

export type ResponseDef = {
  type?: Stringx;
  body?: TResponseBodyDef;
  headers?: Objectx;
  [k: string]: any;
};

export type BaseUriDef = string | (() => string);

export interface DefapiConfig {
  baseUri?: BaseUriDef;
  srcPath?: string;
  title?: string;
  headers?: Objectx | (() => Objectx);
}

// ---- ---- ---- ---- ----

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
  register
};

export default defapi;
