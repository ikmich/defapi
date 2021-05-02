// noinspection JSUnusedGlobalSymbols

import 'reflect-metadata';
import {Express, Request} from 'express';
import {CONFIG_FILENAME} from './constants';
import {defapiRouter} from './api/defapi-router';
import fileUtil from './util/file-util';
import * as FS from 'fs-extra';
import {DefapiError} from './errors';

export type Objectx = object | null | undefined;
export type Stringx = string | null | undefined;
export type Arrayx<T> = Array<T> | null | undefined;

export type TQueryParamsDef = {
  [k: string]: TypeDef;
}

export type TBodyParamsDef = {
  [k: string]: TypeDef;
};

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

export interface EndpointDef {
  path: string;
  method: string;
  title?: Stringx;
  description?: Stringx;
  request?: RequestDef;
  response?: ResponseDef;
  queryParams?: TQueryParamsDef;
  bodyParams?: TBodyParamsDef;
  group?: Stringx;
}

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


// +++++++++++++++++++++++

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

export const defapi = {
  register
};

// +++++++++++++++++++++++ Decorators

const key_defQuery = Symbol('defQuery');

export type TDecorEndpointDefs = {
  queryParams?: TQueryParamsDef;
  bodyParams?: any;
}

/**
 * Map of def id to EndpointDef
 */
export type TDecorData = { [k: string]: EndpointDef };

// To be saved in persitent store and used to compile defs.
const decorData: TDecorData[] = [];

type TDefQueryMetadata = {
  queryParamKey: string;
};

export function defQuery(queryParamKey: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    let defQueryMetadata: TDefQueryMetadata[] = Reflect.getOwnMetadata(key_defQuery, target, propertyKey) ?? [];
    defQueryMetadata.push({queryParamKey});
    Reflect.defineMetadata(key_defQuery, defQueryMetadata, target, propertyKey);
  };
}


export function defEndpoint(opts?: Partial<EndpointDef>) {
  /* Todo - Continue
   *   - Combine opts with the request object, to capture definitions.
   *   - Create map of key (def id) to EndpointDef.
   */
  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    // const metadataKeys: any[] = Reflect.getMetadataKeys(target, propertyKey);
    const defQueryMETADATA: TDefQueryMetadata[] = Reflect.getOwnMetadata(key_defQuery, target, propertyKey) || [];

    const originalFn: Function = propertyDescriptor.value;
    try {
      propertyDescriptor.value = function (...args) {
        if (args && args.length) {
          const req = args[0] as Request;
          if (req) {
            for (let paramName of Object.keys(req.query)) {
              let found = false;
              for (let md of defQueryMETADATA) {
                if (md.queryParamKey === paramName) {
                  found = true;
                  if (!args.includes(paramName)) {
                    args.push(req.query[paramName]);
                  }
                }
              }
              if (found) {
                break;
              }
            }
          }
        }
        originalFn.apply(this, args);
      };
    } catch (e) {
      console.error('<ERR>', e);
    }

    console.log({
      propertyKey,
      defQueryMETADATA
    });
  };
}
