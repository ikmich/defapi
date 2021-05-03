
import 'reflect-metadata';
import {Request} from "express";
import {EndpointDef} from "../index";

const KEY_DECOR_DEF_QUERY = Symbol('defQuery');

type TDecorDefQueryMetadata = {
  queryParamKey: string;
  type: any;
  parameterIndex: number;
};

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

export function defEndpoint(decorDef?: EndpointDef) {
  /* Todo - Continue
   *   - Combine opts with the request object, to capture definitions.
   *   - Create map of key (def id) to EndpointDef.
   */

  return function (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    console.log('\n+++[@defEndpoint]+++');
    const defQueryMETADATA: TDecorDefQueryMetadata[] = Reflect.getOwnMetadata(KEY_DECOR_DEF_QUERY, target, propertyKey) || [];

    // let decorDef = _def(opts as EndpointDef);
    const originalFn: Function = propertyDescriptor.value;
    try {
      propertyDescriptor.value = function (...args:any[]) {
        let originalArgs = Array.from(args);
        if (args && args.length) {
          const req = args[0] as Request;
          if (req) {
            for (let paramName of Object.keys(req.query)) {
              for (let md of defQueryMETADATA) {
                if (md.queryParamKey === paramName) {
                  args.push(req.query[paramName]);
                }
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
