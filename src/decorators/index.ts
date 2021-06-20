// noinspection JSUnusedGlobalSymbols

import 'reflect-metadata';
import { EndpointDef } from '../types';
import _util, { ifdev, yes } from '../common/util';
import { Request } from 'express';
import { store } from '../common/util/store';
import { _def, _defId, _method, _path } from '../common/defs';

const KEY_DECOR_DEF_QUERY = Symbol('defQuery');
const KEY_DECOR_DEF_BODY = Symbol('defRequest');

type TDecorDefQueryMetadata = {
  queryParamKey: string;
  type: any;
  parameterIndex: number;
};

type TDecorDefBodyMetadata = {
  bodyParamKey: string;
  type: any;
  parameterIndex: number;
};

export function defBody(bodyParamKey: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    let typeData = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    let metadata: TDecorDefBodyMetadata = {
      bodyParamKey,
      type: Object,
      parameterIndex
    };
    if (typeData && typeData.length) {
      for (let i = 0; i < typeData.length; i++) {
        if (i === parameterIndex) {
          metadata['type'] = typeData[i];
        }
      }
    }

    let ownMetadata: TDecorDefBodyMetadata[] = Reflect.getOwnMetadata(KEY_DECOR_DEF_BODY, target, propertyKey) ?? [];
    ownMetadata.push(metadata);
    Reflect.defineMetadata(KEY_DECOR_DEF_BODY, ownMetadata, target, propertyKey);
  };
}

export function defQuery(queryParamKey: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    let typeData = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    let metadata: TDecorDefQueryMetadata = { queryParamKey, type: Object, parameterIndex };
    if (typeData && typeData.length) {
      for (let i = 0; i < typeData.length; i++) {
        if (i === parameterIndex) {
          metadata['type'] = typeData[i];
        }
      }
    }

    let ownMetadata: TDecorDefQueryMetadata[] = Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) ?? [];
    ownMetadata.push(metadata);
    Reflect.defineMetadata(KEY_DECOR_DEF_QUERY, ownMetadata, target, propertyKey);
  };
}

export function defEndpoint(method: string, path: string, decorDef?: Partial<EndpointDef>) {
  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    ifdev(() => {
      // console.log('\n+++[@defEndpoint]+++');
    });

    const defQueryMetadata: TDecorDefQueryMetadata[] =
      Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) || [];

    const defBodyMetadata: TDecorDefBodyMetadata[] =
      Reflect.getOwnMetadata(KEY_DECOR_DEF_BODY, target, propertyKey) || [];

    decorDef = _util.fn(() => {
      let def = Object.assign({}, decorDef);
      if (!decorDef) def = {};
      def.method = method;
      def.path = path;
      return _def(def as EndpointDef);
    }) as EndpointDef;

    method = method ?? decorDef?.method ?? null;
    path = path ?? decorDef?.path ?? null;

    const hasMethod = yes(method);
    const hasPathArg = yes(path);

    if (hasMethod && hasPathArg) {
      decorDef.method = _method(method);
      decorDef.path = _path(path);

      const storeKey = _defId(<EndpointDef>decorDef);

      // capture queryParams
      let defQueryParams: any = {};
      for (let md of defQueryMetadata) {
        defQueryParams[md.queryParamKey] = md.type.name.toLowerCase();
      }

      let keys_defQueryParams = Object.keys(defQueryParams);
      if (keys_defQueryParams.length) {
        if (!decorDef.queryParams) {
          decorDef.queryParams = Object.assign({}, defQueryParams);
        } else {
          for (let key of keys_defQueryParams) {
            const value_defQueryParam = defQueryParams[key];
            const value_decorDef_queryParam = decorDef.queryParams[key];
            if (typeof value_decorDef_queryParam === 'string') {
              decorDef.queryParams[key] = value_defQueryParam;
            } else if (typeof value_decorDef_queryParam === typeof {}) {
              decorDef.queryParams[key] = Object.assign({}, decorDef.queryParams[key], {
                type: value_defQueryParam
              });
            } else {
              decorDef.queryParams[key] = defQueryParams[key];
            }
          }
        }
      }

      // capture bodyParams
      let defBodyParams: any = {};
      for (let md of defBodyMetadata) {
        defBodyParams[md.bodyParamKey] = md.type.name.toLowerCase();
      }

      let keys_defBodyParams = Object.keys(defBodyParams);
      if (keys_defBodyParams.length) {
        if (!decorDef.bodyParams) {
          decorDef.bodyParams = Object.assign({}, defBodyParams);
        } else {
          for (let key of keys_defBodyParams) {
            const value_defBodyParam = defBodyParams[key];
            const value_decorDef_bodyParam = decorDef.bodyParams[key];
            if (typeof value_decorDef_bodyParam === 'string') {
              decorDef.bodyParams[key] = value_defBodyParam;
            } else if (typeof value_decorDef_bodyParam === typeof {}) {
              decorDef.bodyParams[key] = Object.assign({}, decorDef.bodyParams[key], {
                type: value_defBodyParam
              });
            } else {
              decorDef.bodyParams[key] = defBodyParams[key];
            }
          }
        }
      }

      store.save(storeKey, decorDef);
    }

    ifdev(() => {
      // console.log({ def: decorDef });
      // console.log({
      //   propertyKey,
      //   defQueryMetadata,
      //   defBodyMetadata
      // });
    });

    // ----

    // Process @defQuery()
    if (defQueryMetadata && defQueryMetadata.length) {
      const originalFn: Function = propertyDescriptor.value;
      try {
        propertyDescriptor.value = function (...args: any[]) {
          let req: Request | null = null;

          if (args && args.length) {
            req = args[0] as Request;
            if (req) {
              for (let md of defQueryMetadata) {
                args[md.parameterIndex] = req.query[md.queryParamKey];
              }
            }
          }

          return originalFn.apply(this, args);
        };
      } catch (e) {
        console.error('[defapi.ERR] Error processing @defQuery decorator', e);
      }
    }

    // Process @defBody()
    if (defBodyMetadata && defBodyMetadata.length) {
      const originalFn: Function = propertyDescriptor.value;
      try {
        propertyDescriptor.value = function (...args: any[]) {
          let req: Request | null = null;

          if (args && args.length) {
            req = args[0] as Request;
            if (req) {
              for (let md of defBodyMetadata) {
                args[md.parameterIndex] = req.body[md.bodyParamKey];
              }
            }
          }

          return originalFn.apply(this, args);
        };
      } catch (e) {
        console.error('[defapi.ERR] Error processing @defBody decorator', e);
      }
    }
  };
}
