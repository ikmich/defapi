// noinspection JSUnusedGlobalSymbols

import 'reflect-metadata';
import {EndpointDef} from '../types';
import {_def, _defIdentity, getDefFileTitle, yes} from '../common/util';
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

export function defEndpoint(def?: Partial<EndpointDef>) {
  /* Todo - Continue
   *   - Combine opts with the request object, to capture definitions.
   *   - Create map of key (def id) to EndpointDef.
   */

  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    console.log('\n+++[@defEndpoint]+++');

    const defQueryMetadata: TDecorDefQueryMetadata[] =
        Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) || [];

    const defBodyMetadata: TDecorDefBodyMetadata[] =
        Reflect.getOwnMetadata(KEY_DECOR_DEF_BODY, target, propertyKey) || [];

    def = def ? _def(def as EndpointDef) : {};

    if (defQueryMetadata && defQueryMetadata.length) {
      const originalFn: Function = propertyDescriptor.value;
      try {
        propertyDescriptor.value = function (...args: any[]) {
          let req: Request | null = null;

          if (args && args.length) {
            req = args[0] as Request;

            if (req) {
              for (let md of defQueryMetadata) {
                if (Object.keys(req.query).includes(md.queryParamKey)) {
                  if (!args.includes(md.queryParamKey)) {
                    args.push(req.query[md.queryParamKey]);
                  }
                }
              }

              for (let md of defBodyMetadata) {
                if (Object.keys(req.query).includes(md.bodyParamKey)) {
                  if (!args.includes(md.bodyParamKey)) {
                    args.push(req.body[md.bodyParamKey]);
                  }
                }
              }
            }
          }

          return originalFn.apply(this, args);
        };
      } catch (e) {
        console.error('[defapi.ERR]', e);
      }

      // ++++

      if (yes(def.path) && yes(def.method)) {
        const storeKey = getDefFileTitle(<EndpointDef>def);
        console.log({storeKey});

        // capture queryParams
        let _queryParams: any = {};
        for (let md of defQueryMetadata) {
          _queryParams[md.queryParamKey] = md.type.name;
        }

        //if (!def.queryParams) def.queryParams = {};
        def.queryParams = {
          ...def.queryParams,
          ..._queryParams
        };

        // capture bodyParams
        let _bodyParams: any = {};
        for (let md of defBodyMetadata) {
          _bodyParams[md.bodyParamKey] = md.type.name;
        }
        if (!def.bodyParams) def.bodyParams = {};
        def.bodyParams = {
          ...def.bodyParams,
          ..._bodyParams
        };

        store.save(storeKey, def);
      }
    }

    console.log({def});
    console.log({
      propertyKey,
      defQueryMETADATA: defQueryMetadata
    });
  };
}
