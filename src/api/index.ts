import { Express } from 'express';
import { EndpointDef } from '../index';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import {excludedPaths} from "../common/constants";
import {_def, _method, _path} from "../common/util";

function getEndpoints(app: Express): EndpointDef[] {
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

export { getEndpoints };
