import {Express, Request, Response} from "express";
import {DEFS_DIR_NAME, MANIFEST_FILENAME, SETTING_BASE_URI, SETTING_SRC_PATH} from "../../../constants";
import {_def, httpFail, httpSuccess} from "../../../util/_util";
import {ApiManifest, EndpointDef} from "../../types";
import getEndpoints from "../../lib/get-endpoints";
import readDocapiBaseDir from "../../lib/read-docapi-base-dir";

const FS = require('fs-extra');
const Path = require('path');

function postDocapiController(req: Request, res: Response) {
  try {
    const baseUri = req.app.get(SETTING_BASE_URI);
    const srcPath = req.app.get(SETTING_SRC_PATH);
    const baseDir = process.cwd();
    const responseData: any = {};

    // ----

    let srcDir = Path.resolve(baseDir, srcPath);
    if (!FS.existsSync(srcDir)) {
      return httpFail(res, 'Unable to resolve src_path', 500);
    }

    let docapiBaseDir = Path.resolve(srcDir, DEFS_DIR_NAME);
    FS.ensureDirSync(docapiBaseDir);

    // ----

    let defaultDict: { [k: string]: EndpointDef } = {};
    let manifestDict: { [k: string]: EndpointDef } = {};

    let defaultDefs: EndpointDef[] = getEndpoints(<Express>req.app);
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
    mergedDefs = readDocapiBaseDir(docapiBaseDir, mergedDefs);

    responseData.mergedDefs = mergedDefs;

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
      return httpFail(res, e);
    }

    return httpSuccess(res, responseData);
  } catch (e) {
    return httpFail(res, e);
  }
}


export default postDocapiController;
