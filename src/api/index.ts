import { Application, Express, Response } from 'express';
import { EndpointDef } from '../types';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import { yes } from '../common/util';
import { HttpError } from '../common/errors';
import configUtil from '../common/util/configUtil';
import { DEFAULT_ROUTE_PREFIX, excludedPaths } from '../common';
import { _def, _method, _path } from '../common/defs';

export function getEndpoints(app: Express | Application): EndpointDef[] {
  const endpoints: Endpoint[] = Array.from(listEndpoints(<Express>app));
  const defs: EndpointDef[] = [];

  endpoints.forEach((endpoint) => {
    let isDefapiPath = /defapi\/?/.test(endpoint.path);
    if (!excludedPaths.includes(endpoint.path) && !isDefapiPath) {
      endpoint.methods.forEach((method) => {
        let def: EndpointDef = {
          path: _path(endpoint.path),
          method: _method(method)
        };

        defs.push(_def(def));
      });
    }
  });

  return defs.map((def) => {
    return _def(def);
  });
}

export const httpSuccess = (res: Response, data?: any, message?: string) => {
  let body: any = {
    status: 'success'
  };

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
    status: 'fail',
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

export const API_PATH_ENDPOINTS = `/${getDefapiRoutePrefix()}/endpoints`;
export const API_PATH_DOCS = `/${getDefapiRoutePrefix()}/docs/html`;
export const API_PATH_GENERATE_DEFS = `/${getDefapiRoutePrefix()}/defs/generate`;
export const API_PATH_GET_JSON = `/${getDefapiRoutePrefix()}/defs/json`;
// export const HTML_INDEX_PATH = Path.join(__dirname, '../../public/html/index.html');
// export const HTML_INDEX_PATH = Path.join(__dirname, '../../client/build/index.html');

function getDefapiRoutePrefix() {
  let routePrefix = configUtil.getDefapiRoutePrefix();
  if (yes(routePrefix)) {
    return routePrefix.replace(/^\/+/, '');
  }
  return DEFAULT_ROUTE_PREFIX.replace(/^\/+/, '');
}
