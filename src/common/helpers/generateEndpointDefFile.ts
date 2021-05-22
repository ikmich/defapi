import { _defFileTitle, yes } from '../util';
import Path from 'path';
import fileUtil from '../util/fileUtil';
import FS from 'fs-extra';
import { EndpointDef } from '../../types';
import conprint from '../util/conprint';
import jsonToString from '../util/jsonToString';

export type TGenDefFileMeta = {
  shouldUpdate?: boolean;
};

/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param meta
 */
export function generateEndpointDefFile(def: EndpointDef, meta?: TGenDefFileMeta) {
  const { shouldUpdate } = meta ?? {};
  let defsDir = fileUtil.getDefsDir();
  const filename = `${_defFileTitle(def)}.js`;
  const filepath = Path.resolve(defsDir, filename);
  let defaultTitle = `${def.method} ${def.path}`;

  if (shouldUpdate) {
    if (FS.existsSync(filepath)) {
      // Def file exists for this endpoint. Read file and create merged def.
      try {
        const prevDef = require(filepath);
        if (prevDef) {
          const mergedDef: Partial<EndpointDef> = {
            ...prevDef,
            method: def.method,
            path: def.path
          };

          /**
           * These are props from the existing endpoint def file that are allowed to be overwritten by this process.
           */
          const PROPS_ALLOW_OVERWRITE = ['path', 'method'];

          Object.entries(def).forEach(([prop, val]) => {
            if (PROPS_ALLOW_OVERWRITE.includes(prop)) {
              if (yes(val)) {
                // @ts-ignore
                mergedDef[prop] = val;
              }
              if (typeof val === typeof {}) {
                if (yes(val)) {
                  // @ts-ignore
                  mergedDef[prop] = {
                    // @ts-ignore
                    ...def[prop],
                    ...prevDef[prop]
                  };
                }
              } else {
                if (yes(val)) {
                  // @ts-ignore
                  mergedDef[prop] = val;
                }
              }
            }
          });

          def = {
            ...(mergedDef as EndpointDef)
          };
        }
      } catch (e) {
        conprint.error(e);
        throw e;
      }
    }
  }

  let contents = `
const def = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${yes(def.title) ? def.title : defaultTitle}",
  description: "${def.description ?? ''}",
  /** Defaults to "application/json" */
  contentType: "${def.contentType ?? ''}",
  queryParams: ${jsonToString(def.queryParams, 1)},
  bodyParams: ${jsonToString(def.bodyParams, 1)},
  headers: ${jsonToString(def.headers, 1)},
  response: {
    /** Defaults to "application/json" if not set. */
    type: "",
    body: {}
  }
};
module.exports = def;`;

  try {
    FS.writeFileSync(filepath, contents);
  } catch (e) {
    console.error(e);
    throw e;
  }

  return {
    filepath,
    filename,
    contents
  };
}
