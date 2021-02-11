import {ApiManifest, DocapiConfig, EndpointDef} from "../../api/meta";
import {DEFS_DIR_NAME, MANIFEST_FILENAME, SETTING_BASE_URI, SETTING_SRC_PATH} from "../../constants";
import {_def, httpFail} from "../../util/_util";
import { getEndpoints } from "../../api/lib/get-endpoints";
import {Application, Express} from "express";
import parseDocapiBaseDir from "./parseDocapiBaseDir";
import Path from "path";
import FS from "fs-extra";

function generateManifest(input: DocapiConfig, app:Application) {
  const baseUri = input.base_uri;
  const srcPath = input.src_path ?? '.';
  const baseDir = process.cwd();

  // ----

  let srcDir = Path.resolve(baseDir, srcPath);
  if (!FS.existsSync(srcDir)) {
    throw new Error('Unable to resolve src_path');
  }

  let docapiBaseDir = Path.resolve(srcDir, DEFS_DIR_NAME);
  FS.ensureDirSync(docapiBaseDir);

  // ----

  let defaultDict: { [k: string]: EndpointDef } = {};
  let manifestDict: { [k: string]: EndpointDef } = {};

  let defaultDefs: EndpointDef[] = getEndpoints(<Express> app);
  let mergedDefs: EndpointDef[] = [];
  let manifestDefs: EndpointDef[] = [];

  let manifestFile = Path.resolve(srcPath, MANIFEST_FILENAME);
  if (FS.existsSync(manifestFile)) {
    try {
      const ob = require(manifestFile) as ApiManifest;
      if (ob && Array.isArray(ob.endpoints)) {
        manifestDefs = ob.endpoints;
      }
    } catch (e) {
      console.log(`Possible invalid manifest file :: ${e.mesage}`);
    }
  }

  // [create default dict]
  if (Array.isArray(defaultDefs) && defaultDefs.length > 0) {
    defaultDefs.forEach((def) => {
      def = _def(def);
      const key = `${def.method} ${def.path}`;
      defaultDict[key] = def;
    });
  }

  // [create manifest dict]
  if (Array.isArray(manifestDefs) && manifestDefs.length > 0) {
    manifestDefs.forEach((def) => {
      def = _def(def);
      const key = `${def.method} ${def.path}`;
      manifestDict[key] = def;
    });
  }

  // [extend manifest dict from default dict]
  Object.keys(defaultDict).forEach((key) => {
    manifestDict[key] = {
      ...manifestDict[key],
      ...defaultDict[key]
    };
  });

  // [create mergedDefs array from manifestDict]
  Object.keys(manifestDict).forEach(key => {
    mergedDefs.push(manifestDict[key]);
  });

  // Read entries in docapiBaseDir and merge to manifest.
  mergedDefs = parseDocapiBaseDir(docapiBaseDir, mergedDefs);

  let contents = `/**
* Generated docapi manifest.
*/
module.exports = {
  baseUri: '${baseUri}',
  endpoints: ${JSON.stringify(mergedDefs, null, 2)}
};`;

  try {
    FS.writeFileSync(manifestFile, contents);
  } catch (e) {
    throw e;
    //return httpFail(res, e);
  }

  return {mergedDefs, manifestFile, contents};
}

export {
  generateManifest
}
