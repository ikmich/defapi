import { Application, Express, Response } from 'express';
import { EndpointDef } from '../types';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import { yes } from '../common/util';
import { HttpError } from '../common/errors';
import configManager from '../common/managers/configManager';
import { DEFAULT_ROUTE_PREFIX, excludedPaths } from '../common';
import { _def, _method, _path } from '../common/defs';

export function getRawEndpoints(app: Express | Application, excludeDefapiPaths = true): EndpointDef[] {
  const endpoints: Endpoint[] = Array.from(listEndpoints(<Express>app));
  const defs: EndpointDef[] = [];

  for (let endpoint of endpoints) {
    const rex = new RegExp(`${getDefapiRoutePrefix()}\/?`);
    let isDefapiPath = rex.test(endpoint.path);
    if (excludedPaths.includes(endpoint.path) || (excludeDefapiPaths && isDefapiPath)) {
      continue;
    }

    endpoint.methods.forEach((method) => {
      let def: EndpointDef = {
        path: _path(endpoint.path),
        method: _method(method)
      };

      defs.push(_def(def));
    });
  }

  return defs.map((def) => {
    return _def(def);
  });
}

export const httpSuccess = (res: Response, data?: any, message?: string) => {
  let body: any = {};

  if (data) {
    body.data = data;
  }

  if (message) {
    body.message = message;
  }

  res.status(200).json(body);
};

export const httpFail = (res: Response, error: string | Error | HttpError, httpCode?: number | null, data?: any) => {
  let body: any = {
    message: typeof error === 'string' ? error : error.message
  };

  if (data) {
    body.data = data;
  }

  if (error instanceof HttpError) {
    httpCode = error.statusCode;
  }

  if (!httpCode) {
    httpCode = 500;
  }

  res.status(httpCode).json(body);
};

export const API_PATH_STATUS = `/${getDefapiRoutePrefix()}/status`;
export const API_PATH_ENDPOINTS = `/${getDefapiRoutePrefix()}/endpoints`;
export const API_PATH_DEFS = `/${getDefapiRoutePrefix()}/defs`;
export const API_PATH_JSON = `/${getDefapiRoutePrefix()}/defs/json`;
export const API_PATH_MANIFEST = `/${getDefapiRoutePrefix()}/manifest`;

export const API_PATHS_LIST = [API_PATH_STATUS, API_PATH_ENDPOINTS, API_PATH_DEFS, API_PATH_JSON, API_PATH_MANIFEST];

function getDefapiRoutePrefix() {
  let defapiRoutePrefix = configManager.getDefapiRoutePrefix();
  if (yes(defapiRoutePrefix)) {
    return defapiRoutePrefix.replace(/^\/+/, '');
  }
  return `${DEFAULT_ROUTE_PREFIX.replace(/^\/+/, '')}`;
}
