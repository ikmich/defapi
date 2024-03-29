import { EndpointDef } from '../../types';
import fileManager from '../managers/fileManager';
import Path from 'path';
import { no } from '../util';
import { store } from '../util/store';
import { _defaultTitle, _defFilename, _defId } from '../defs';

/**
 * Composes an 'output' def from the pure input def, based on info from existing endpoint def files and defined
 * decorators.
 * @param inputDef
 * @param shouldUpdate
 */
export function composeOutputDef(inputDef: EndpointDef, shouldUpdate = true): EndpointDef {
  let outputDef = Object.assign({}, inputDef);
  let defsDir = fileManager.getDefsDir();
  const filepath = Path.join(defsDir, _defFilename(outputDef));

  if (shouldUpdate) {
    if (fileManager.exists(filepath)) {
      // => Def file exists for this endpoint. Read file and create merged def.
      const fileContents = fileManager.read(filepath);
      if (fileContents) {
        const existingDef = JSON.parse(fileContents, (key: string, value: any) => {
          if (value === null || value === undefined) {
            return '';
          }
          return value;
        });
        if (existingDef) {
          const mergedDef: Partial<EndpointDef> = Object.assign({}, existingDef, {
            // Keep the path and method from the pure def.
            path: outputDef.path,
            method: outputDef.method
          });

          outputDef = Object.assign({}, mergedDef as EndpointDef);
        }
      }
    }
  }

  if (no(outputDef.title)) {
    outputDef.title = _defaultTitle(outputDef);
  }

  if (!outputDef.queryParams) {
    outputDef.queryParams = {};
  }

  if (!outputDef.headers) {
    outputDef.headers = {};
  }

  const NO_BODY_METHODS = ['GET', 'DELETE', 'TRACE', 'OPTIONS', 'HEAD'];
  const BODY_METHODS = ['POST', 'PUT', 'PATCH'];
  if (BODY_METHODS.includes(outputDef.method.toUpperCase())) {
    if (!outputDef.bodyParams) {
      outputDef.bodyParams = {};
    }

    if (no(outputDef.contentType)) {
      outputDef.contentType = '?';
    }
  }

  /* Merge in the defs from decorators. */
  const decorDef = store.get(_defId(outputDef));
  if (decorDef) {
    outputDef = Object.assign({}, outputDef, decorDef);
  }

  return outputDef;
}
