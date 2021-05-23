import { EndpointDef } from '../../types';
import fileUtil from '../util/fileUtil';
import Path from 'path';
import { no } from '../util';
import { store } from '../util/store';
import { _defFilename, _defId } from '../defs';

export function composeDef(pureDef: EndpointDef, shouldUpdate = true): EndpointDef {
  let _def = Object.assign({}, pureDef);
  let defsDir = fileUtil.getDefsDir();
  const filepath = Path.join(defsDir, _defFilename(_def));

  if (shouldUpdate) {
    if (fileUtil.exists(filepath)) {
      // => Def file exists for this endpoint. Read file and create merged def.
      const fileContents = fileUtil.read(filepath);
      if (fileContents) {
        const existingDef = JSON.parse(fileContents, (key: string, value: any) => {
          if (value === null || value === undefined) {
            return '';
          }
          return value;
        });
        if (existingDef) {
          const mergedDef: Partial<EndpointDef> = Object.assign({}, existingDef, {
            path: _def.path,
            method: _def.method
          });

          _def = Object.assign({}, mergedDef as EndpointDef);
        }
      }
    }
  }

  if (!_def.queryParams) {
    _def.queryParams = {};
  }

  if (!_def.headers) {
    _def.headers = {};
  }

  const BODY_METHODS = ['POST', 'PUT', 'PATCH'];
  if (BODY_METHODS.includes(_def.method.toUpperCase())) {
    if (!_def.bodyParams) {
      _def.bodyParams = {};
    }

    if (no(_def.contentType)) {
      _def.contentType = '?';
    }
  }

  /* Merge in the defs from decorators. */
  const decorDef = store.get(_defId(_def));
  if (decorDef) {
    _def = Object.assign({}, _def, decorDef);
  }

  return _def;
}
