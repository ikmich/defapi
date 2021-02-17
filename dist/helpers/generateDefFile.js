"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _util_1 = require("../util/_util");
const path_1 = __importDefault(require("path"));
const file_util_1 = __importDefault(require("../util/file-util"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param {boolean} update Whether to update an existing def file
 */
function generateDefFile(def, update) {
    var _a;
    let defsDir = file_util_1.default.getDefsDir();
    const filename = `${_util_1.getDefFileStub(def)}.js`;
    const filepath = path_1.default.resolve(defsDir, filename);
    let defaultTitle = `${def.method} ${def.path}`;
    let contents = `/**
 * @typedef {import('apidef').EndpointDef} EndpointDef
 * @type {EndpointDef}
 */
const def = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${_util_1.yes(def.title) ? def.title : defaultTitle}",
  description: "${(_a = def.description) !== null && _a !== void 0 ? _a : ''}",
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
        fs_extra_1.default.writeFileSync(filepath, contents);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    return {
        filepath,
        filename,
        contents,
    };
}
exports.default = generateDefFile;
