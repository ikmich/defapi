import ut, { getDefFileTitle, yes } from './index';
import Path from 'path';
import fileUtil from './file-util';
import FS from 'fs-extra';
import { EndpointDef } from '../index';
import conprint from './conprint';
import _config from '../_config';
import configUtil from './config-util';

export type TGenDefFileMeta = {
  isUpdate?: boolean;
};

/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param meta
 */
export function generateEndpointDefFile(def: EndpointDef, meta?: TGenDefFileMeta) {
  const { isUpdate } = meta ?? {};
  let defsDir = fileUtil.getDefsDir();
  const filename = `${getDefFileTitle(def)}.js`;
  const filepath = Path.resolve(defsDir, filename);
  let defaultTitle = `${def.method} ${def.path}`;

  if (isUpdate) {
    if (FS.existsSync(filepath)) {
      // Def file exists for this endpoint
      // Read file and create merged def
      try {
        const prevDef = require(filepath);
        if (yes(prevDef)) {
          const mergedDef: Partial<EndpointDef> = {
            ...prevDef,
            method: def.method,
            path: def.path
          };

          Object.entries(def).forEach(([prop, val]) => {
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
  } // todo - test update init

  let apiHeaders = configUtil.getHeaders();

  let contents = `/**
 * @typedef {import('defapi').EndpointDef} EndpointDef
 * @type {EndpointDef}
 */
const def = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${yes(def.title) ? def.title : defaultTitle}",
  description: "${def.description ?? ''}",
  request: {
    /** Defaults to "application/json" if not set. */
    type: "",
    query: null,
    ${ut.fn(() => {
      if (
        def.method.toUpperCase() !== 'GET' &&
        def.method.toUpperCase() !== 'OPTIONS' &&
        def.method.toUpperCase() !== 'HEAD'
      ) {
        return `body: {},`;
      }
      return '';
    })} ${ut.fn(() => {
      if (apiHeaders) {
        return `headers: ${apiHeaders}`;
      }
      return '';
    })}
  },
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
