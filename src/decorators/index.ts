// noinspection JSUnusedGlobalSymbols

import 'reflect-metadata';
import {EndpointDef} from '../types';
import {_def, _defFileTitle, ifdev, yes} from '../common/util';
import {Request} from 'express';
import {store} from '../common/util/store';

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
    let metadata: TDecorDefQueryMetadata = {queryParamKey, type: Object, parameterIndex};
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

export function defEndpoint(decorDef?: Partial<EndpointDef>) {
  /* Todo - Continue
   *   - Combine opts with the request object, to capture definitions.
   *   - Create map of key (def id) to EndpointDef.
   */

  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    ifdev(() => {
      console.log('\n+++[@defEndpoint]+++');
    });

    const defQueryMetadata: TDecorDefQueryMetadata[] =
        Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) || [];

    const defBodyMetadata: TDecorDefBodyMetadata[] =
        Reflect.getOwnMetadata(KEY_DECOR_DEF_BODY, target, propertyKey) || [];

    decorDef = decorDef ? _def(decorDef as EndpointDef) : {};

    if (yes(decorDef.path) && yes(decorDef.method)) {
      const storeKey = _defFileTitle(<EndpointDef>decorDef);

      // capture queryParams
      let _queryParams: any = {};
      for (let md of defQueryMetadata) {
        _queryParams[md.queryParamKey] = md.type.name;
      }

      decorDef.queryParams = {
        ...decorDef.queryParams,
        ..._queryParams
      };

      // capture bodyParams
      let _bodyParams: any = {};
      for (let md of defBodyMetadata) {
        _bodyParams[md.bodyParamKey] = md.type.name;
      }
      if (!decorDef.bodyParams) decorDef.bodyParams = {};
      decorDef.bodyParams = {
        ...decorDef.bodyParams,
        ..._bodyParams
      };

      store.save(storeKey, decorDef);
    }

    ifdev(() => {
      console.log({def: decorDef});
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
                args[md.parameterIndex] = req.query[md.queryParamKey] ?? undefined;
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
                args[md.parameterIndex] = req.body[md.bodyParamKey] ?? undefined;
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
