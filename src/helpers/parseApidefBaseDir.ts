import {EndpointDef} from "../api/meta";
import {_def} from "../util/_util";

import Path from 'path';
import FS from 'fs';

function parseApidefBaseDir(dirPath: string, defs?: EndpointDef[]): EndpointDef[] {
  if (!defs) defs = [];
  const entries = FS.readdirSync(dirPath);

  for (let entry of entries) {
    if (entry === '.' || entry === '..') {
      continue;
    }

    const entrypath = Path.resolve(dirPath, entry);
    const stat = FS.statSync(entrypath);

    if (stat.isDirectory()) {
      return parseApidefBaseDir(entrypath, Array.from(defs));
    } else if (stat.isFile()) {
      let obs: EndpointDef[] = [];
      let contentOb: any;
      try {
        contentOb = require(entrypath);
      } catch (e) {
        console.log(`Error parsing ${entrypath}`);
        return defs;
      }

      if (!contentOb) {
        return defs;
      }

      if (contentOb.constructor == Object) {
        obs.push(contentOb as EndpointDef);
      } else if (contentOb.constructor == Array) {
        obs = Array.from(contentOb as EndpointDef[]);
      }

      // create mapper dict
      let dict: { [k: string]: EndpointDef } = {};
      for (let ob of obs) {
        ob = _def(ob);
        let key = `${ob.method} ${ob.path}`;
        dict[key] = ob;
      }

      return defs.map((def) => {
        def = _def(def);
        let key = `${def.method} ${def.path}`;
        let dictOb = dict[key];
        if (!!dictOb) {
          return {
            ...def,
            ...dictOb
          };
        }
        return def;
      });
    }
  }

  return defs;
}
export default parseApidefBaseDir;
