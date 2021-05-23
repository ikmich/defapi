import { EndpointDef } from '../../types';
import { GenerateDefOptions } from './getDefDataString';
import { getDefsDataStringMap } from './getDefsDataStringMap';
import fileUtil from '../util/fileUtil';
import { Path } from '../depds';
import {_defFilename, _defId} from "../defs";

export function generateDefFiles(defs: EndpointDef[], opts: GenerateDefOptions) {
  const map = getDefsDataStringMap(defs, opts);
  let defsDir = fileUtil.getDefsDir();
  defs.forEach((def) => {
    const filepath = Path.join(defsDir, _defFilename(def));
    let content = map[_defId(def)];
    fileUtil.write(filepath, content);
  });
}
