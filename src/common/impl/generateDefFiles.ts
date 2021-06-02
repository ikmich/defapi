import { EndpointDef } from '../../types';
import { GenerateDefOptions } from './defObjToString';
import { defsToObjStringDict } from './defsToObjStringDict';
import fileManager from '../managers/fileManager';
import { Path } from '../depds';
import {_defFilename, _defId} from "../defs";

export function generateDefFiles(defs: EndpointDef[], opts: GenerateDefOptions) {
  const map = defsToObjStringDict(defs, opts);
  let defsDir = fileManager.getDefsJsonDir();
  defs.forEach((def) => {
    const filepath = Path.join(defsDir, _defFilename(def));
    let content = map[_defId(def)];
    fileManager.write(filepath, content);
  });
}
