"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _util_1 = require("../util/_util");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function parseDefapiBaseDir(dirPath, defs) {
    if (!defs)
        defs = [];
    const entries = fs_1.default.readdirSync(dirPath);
    for (let entry of entries) {
        if (entry === '.' || entry === '..') {
            continue;
        }
        const entrypath = path_1.default.resolve(dirPath, entry);
        const stat = fs_1.default.statSync(entrypath);
        if (stat.isDirectory()) {
            return parseDefapiBaseDir(entrypath, Array.from(defs));
        }
        else if (stat.isFile()) {
            let obs = [];
            let contentOb;
            try {
                contentOb = require(entrypath);
            }
            catch (e) {
                console.log(`Error parsing ${entrypath}`);
                return defs;
            }
            if (!contentOb) {
                return defs;
            }
            if (contentOb.constructor == Object) {
                obs.push(contentOb);
            }
            else if (contentOb.constructor == Array) {
                obs = Array.from(contentOb);
            }
            // create mapper dict
            let dict = {};
            for (let ob of obs) {
                ob = _util_1._def(ob);
                let key = `${ob.method} ${ob.path}`;
                dict[key] = ob;
            }
            return defs.map((def) => {
                def = _util_1._def(def);
                let key = `${def.method} ${def.path}`;
                let dictOb = dict[key];
                if (!!dictOb) {
                    return Object.assign(Object.assign({}, def), dictOb);
                }
                return def;
            });
        }
    }
    return defs;
}
exports.default = parseDefapiBaseDir;
