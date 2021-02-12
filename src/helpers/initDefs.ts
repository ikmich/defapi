import { DocapiConfig, EndpointDef } from "../api/meta";
import Path from "path";
import FS from "fs-extra";
import fileUtil from "../util/file-util";
import { Express } from "express";
import { getEndpoints } from "../api/lib/get-endpoints";
import { _def } from "../util/_util";
import generateDefFile from "./generateDefFile";

export type InitDefsResult = {
  error?: string | Error;
  message?: string;
};

/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
function initDefs(app: Express, config: DocapiConfig): InitDefsResult {
  // - if defs base dir is not empty, ignore
  // - get endpoints
  // - generate endpoint def file for each endpoint

  let result: InitDefsResult = {};

  let defsDir = fileUtil.getDefsDir();
  FS.ensureDirSync(defsDir);
  console.log({defsDir});

  let isDirEmpty: boolean;
  let entries = FS.readdirSync(defsDir);
  isDirEmpty = !(Array.isArray(entries) && entries.length);

  if (!isDirEmpty) {
    result.message = "docapi defs dir is not empty";
    
    // Todo - Remove dir deletion
    entries.forEach((entry) => {
      FS.unlinkSync(Path.resolve(defsDir, entry));
    });
    isDirEmpty = true;
    // return result;
  }

  let defs: EndpointDef[] = getEndpoints(app);

  if (isDirEmpty) {
    for (let def of defs) {
      def = _def(def);
      def.title = `${def.method} ${def.path}`;

      // create endpoint def file
      let { filepath, contents } = generateDefFile(def);

      try {
        FS.writeFileSync(filepath, contents);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }

  return result;
}
export default initDefs;
