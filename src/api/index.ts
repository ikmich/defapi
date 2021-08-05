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

export const ROUTE_STATUS = `/${getDefapiRoutePrefix()}/status`;
export const ROUTE_ENDPOINTS = `/${getDefapiRoutePrefix()}/endpoints`;
export const ROUTE_DEFS = `/${getDefapiRoutePrefix()}/defs`;
export const ROUTE_JSON = `/${getDefapiRoutePrefix()}/defs/json`;
export const ROUTE_MANIFEST = `/${getDefapiRoutePrefix()}/manifest`;
export const ROUTE_HTML_VIEW = `/${getDefapiRoutePrefix()}/browse`;

export const API_PATHS_LIST = [
  ROUTE_STATUS,
  ROUTE_ENDPOINTS,
  ROUTE_DEFS,
  ROUTE_JSON,
  ROUTE_MANIFEST,
  ROUTE_HTML_VIEW
];

function getDefapiRoutePrefix() {
  let defapiRoutePrefix = configManager.getDefapiRoutePrefix();
  if (yes(defapiRoutePrefix)) {
    return defapiRoutePrefix.replace(/^\/+/, '');
  }
  return `${DEFAULT_ROUTE_PREFIX.replace(/^\/+/, '')}`;
}
