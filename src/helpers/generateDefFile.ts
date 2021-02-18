import {getDefFileStub, no, yes} from "../util/_util";
import Path from "path";
import fileUtil from "../util/file-util";
import FS from "fs-extra";
import { EndpointDef } from "../index";
import conprint from "../cli/cli-helpers/conprint";
import config from "../config";

export type TGenDefFileParams = {
  isUpdate?: boolean;
};

/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param params
 */
export function generateDefFile(def: EndpointDef, params?: TGenDefFileParams) {
  const { isUpdate } = params ?? {};
  let defsDir = fileUtil.getDefsDir();
  const filename = `${getDefFileStub(def)}.js`;
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
            path: def.path,
          };

          if (config.isDev()) {
            console.log(`>> merging def for ${filename} ...`);
          }

          Object.entries(def).forEach(([prop, val]) => {
            if (typeof val === typeof {}) {
              if (yes(val)) {
                // @ts-ignore
                mergedDef[prop] = {
                  ...prevDef[prop],
                  // @ts-ignore
                  ...def[prop],
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
            ...(mergedDef as EndpointDef),
          };
        }
      } catch (e) {
        conprint.error(e);
        throw e;
      }
    }
  } // todo - test update init

  let contents = `/**
 * @typedef {import('defapi').EndpointDef} EndpointDef
 * @type {EndpointDef}
 */
const def = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${yes(def.title) ? def.title : defaultTitle}",
  description: "${def.description ?? ""}",
  request: {
    /** Defaults to "application/json" if not set. */
    type: "",
    query: null,
    body: null,
    headers: null
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
    contents,
  };
}
