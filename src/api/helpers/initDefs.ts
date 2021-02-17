import FS from "fs-extra";
import fileUtil from "../../util/file-util";
import { Express } from "express";
import { getEndpoints } from "../lib/get-endpoints";
import {_def, no} from "../../util/_util";
import generateDefFile from "../../helpers/generateDefFile";
import {ApidefConfig, EndpointDef} from "../../index";

export type InitDefsResult = {
  error?: string | Error;
  message?: string;
};

/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
function initDefs(app: Express, config: ApidefConfig): InitDefsResult {
  let result: InitDefsResult = {};

  let defsDir = fileUtil.getDefsDir();
  FS.ensureDirSync(defsDir);

  let isDirEmpty: boolean;
  let entries = FS.readdirSync(defsDir);
  isDirEmpty = !(Array.isArray(entries) && entries.length);

  if (!isDirEmpty) {
    result.message = "Endpoint defs dir is not empty";
    return result;
  }

  let defs: EndpointDef[] = getEndpoints(app);

  if (isDirEmpty) {
    for (let def of defs) {
      def = _def(def);
      if (no(def.title)) {
        def.title = `${def.method} ${def.path}`;
      }

      // create endpoint def file
      generateDefFile(def);
    }
  }

  result.message = `Endpoint def files created successfully`;

  return result;
}
export default initDefs;
