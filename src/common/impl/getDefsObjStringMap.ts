import { GenerateDefOptions, getDefObjString } from './getDefObjString';
import { EndpointDef } from '../../types';
import {_def, _defId} from "../defs";

export function getDefsObjStringMap(defs: EndpointDef[], opts: GenerateDefOptions): { [k: string]: string } {
  let defContentsMap: { [k: string]: string } = {};
  for (let def of defs) {
    def = _def(def);
    defContentsMap[_defId(def)] = getDefObjString(def, opts);
  }
  return defContentsMap;
}
