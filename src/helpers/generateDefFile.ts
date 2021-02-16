import { EndpointDef } from "../api/meta";
import { getDefFileStub, yes } from "../util/_util";
import Path from "path";
import fileUtil from "../util/file-util";
import FS from "fs-extra";

/**
 * Generates a definition file for an endpoint.
 * @param def
 */
export default function generateDefFile(def: EndpointDef) {
  let defsDir = fileUtil.getDefsDir();

  const filename = `${getDefFileStub(def)}.js`;
  const filepath = Path.resolve(defsDir, filename);

  let defaultTitle = `${def.method} ${def.path}`;
  let contents = `
/**
 @type {EndpointDef}
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
