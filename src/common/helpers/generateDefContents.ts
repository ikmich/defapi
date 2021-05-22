import { _defFilename, _defId, no } from '../util';
import Path from 'path';
import fileUtil from '../util/fileUtil';
import FS from 'fs-extra';
import { EndpointDef } from '../../types';
import { store } from '../util/store';

export type TGenDefFileMeta = {
  shouldUpdate?: boolean;
};

/**
 * Generates string contents for an endpoint def.
 * @param {EndpointDef} def
 * @param meta
 */
export function generateDefContents(def: EndpointDef, meta?: TGenDefFileMeta) {
  def = Object.assign({}, def);
  const { shouldUpdate } = meta ?? {};
  let defsDir = fileUtil.getDefsDir();
  const filepath = Path.join(defsDir, _defFilename(def));

  if (shouldUpdate) {
    if (FS.existsSync(filepath)) {
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
            path: def.path,
            method: def.method
          });

          def = mergedDef as EndpointDef;
        }
      }
    }
  }

  if (!def.queryParams) {
    def.queryParams = {};
  }

  if (!def.headers) {
    def.headers = {};
  }

  const BODY_METHODS = ['POST', 'PUT', 'PATCH'];
  if (BODY_METHODS.includes(def.method.toUpperCase())) {
    if (!def.bodyParams) {
      def.bodyParams = {};
    }

    if (no(def.contentType)) {
      def.contentType = '?';
    }
  }

  /* Merge in the defs from decorators. */
  const decorDef = store.get(_defId(def));
  if (decorDef) {
    def = Object.assign({}, def, decorDef);
  }

  return JSON.stringify(def, null, 2);
}
