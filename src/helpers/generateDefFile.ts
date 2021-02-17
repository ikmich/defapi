import { getDefFileStub, yes } from "../util/_util";
import Path from "path";
import fileUtil from "../util/file-util";
import FS from "fs-extra";
import {EndpointDef} from "../index";

/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param {boolean} update Whether to update an existing def file
 */
export default function generateDefFile(def: EndpointDef, update?: false) {
  let defsDir = fileUtil.getDefsDir();

  const filename = `${getDefFileStub(def)}.js`;
  const filepath = Path.resolve(defsDir, filename);

  let defaultTitle = `${def.method} ${def.path}`;
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
