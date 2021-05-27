// noinspection JSUnusedGlobalSymbols

import 'reflect-metadata';
import { EndpointDef } from '../types';
import { ifdev, yes } from '../common/util';
import { Request } from 'express';
import { store } from '../common/util/store';
import {_def, _defId} from "../common/defs";

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

export function defEndpoint(method: string, decorDef?: Partial<EndpointDef>) {
  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    ifdev(() => {
      console.log('\n+++[@defEndpoint]+++');
    });

    const defQueryMetadata: TDecorDefQueryMetadata[] =
      Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) || [];

    const defBodyMetadata: TDecorDefBodyMetadata[] =
      Reflect.getOwnMetadata(KEY_DECOR_DEF_BODY, target, propertyKey) || [];

    if (yes(method) && decorDef && yes(decorDef.path)) {
      decorDef.method = method;
      decorDef = decorDef ? _def(decorDef as EndpointDef) : {};

      if (yes(decorDef.path)) {
        decorDef.method = method.toUpperCase();
        const storeKey = _defId(<EndpointDef>decorDef);

        // capture queryParams
        let _queryParams: any = {};
        for (let md of defQueryMetadata) {
          _queryParams[md.queryParamKey] = md.type.name;
        }

        decorDef.queryParams = Object.assign({}, decorDef.queryParams, _queryParams);

        // capture bodyParams
        let _bodyParams: any = {};
        for (let md of defBodyMetadata) {
          _bodyParams[md.bodyParamKey] = md.type.name;
        }
        if (!decorDef.bodyParams) decorDef.bodyParams = {};
        decorDef.bodyParams = Object.assign({}, decorDef.bodyParams, _bodyParams);

        store.save(storeKey, decorDef);
      }
    }

    ifdev(() => {
      console.log({ def: decorDef });
      console.log({
        propertyKey,
        defQueryMetadata,
        defBodyMetadata
      });
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
