import { EndpointDef } from "../api/meta";
import { getDefFileStub } from "../util/_util";
import Path from "path";
import fileUtil from "../util/file-util";
import FS from "fs-extra";

export default function generateDefFile(def: EndpointDef) {
  let defsDir = fileUtil.getDefsDir();
  FS.ensureDirSync(defsDir);

  const filename = `${getDefFileStub(def)}.js`;
  const filepath = Path.resolve(defsDir, filename);

  let contents = `module.exports = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${def.title ?? ''}",
  description: "${def.description ?? ''}",
  request: {
    type: "",
    query: null,
    body: null,
    headers: null
  },
  response: {
    type: "",
    body: {}
  }
}`;

  return {
    filepath,
    filename,
    contents,
  };
}
