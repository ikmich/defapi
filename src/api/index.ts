import { Express, Response } from 'express';
import { EndpointDef } from '../types';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import { excludedPaths } from '../common/constants';
import { _def, _method, _path } from '../common/util';
import { HttpError } from '../common/errors';

export function getEndpoints(app: Express): EndpointDef[] {
  const endpoints: Endpoint[] = Array.from(listEndpoints(app));
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
    def = _def(def);
    return {
      ...def,
      title: def.path
    };
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
