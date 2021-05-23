import { GenerateDefOptions, getDefDataString } from './getDefDataString';
import { EndpointDef } from '../../types';
import {_def, _defId} from "../defs";

export function getDefsDataStringMap(defs: EndpointDef[], opts: GenerateDefOptions): { [k: string]: string } {
  let defContentsMap: { [k: string]: string } = {};
  for (let def of defs) {
    def = _def(def);
    defContentsMap[_defId(def)] = getDefDataString(def, opts);
  }
  return defContentsMap;
}
