import { GenerateDefOptions, defObjToString } from './defObjToString';
import { EndpointDef } from '../../types';
import {_def, _defId} from "../defs";

export function defsToObjStringDict(defs: EndpointDef[], opts: GenerateDefOptions): { [k: string]: string } {
  let defContentsMap: { [k: string]: string } = {};
  for (let def of defs) {
    def = _def(def);
    defContentsMap[_defId(def)] = defObjToString(def, opts);
  }
  return defContentsMap;
}
