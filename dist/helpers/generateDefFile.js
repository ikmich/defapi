"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _util_1 = require("../util/_util");
var path_1 = __importDefault(require("path"));
var file_util_1 = __importDefault(require("../util/file-util"));
var fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * Generates a definition file for an endpoint.
 * @param def
 */
function generateDefFile(def) {
    var _a;
    var defsDir = file_util_1.default.getDefsDir();
    var filename = _util_1.getDefFileStub(def) + ".js";
    var filepath = path_1.default.resolve(defsDir, filename);
    var defaultTitle = def.method + " " + def.path;
    var contents = "/**\n @type {EndpointDef}\n */\nconst def = {\n  path: \"" + def.path + "\",\n  method: \"" + def.method + "\",\n  title: \"" + (_util_1.yes(def.title) ? def.title : defaultTitle) + "\",\n  description: \"" + ((_a = def.description) !== null && _a !== void 0 ? _a : "") + "\",\n  request: {\n    /** Defaults to \"application/json\" if not set. */\n    type: \"\",\n    query: null,\n    body: null,\n    headers: null\n  },\n  response: {\n    /** Defaults to \"application/json\" if not set. */\n    type: \"\",\n    body: {}\n  }\n};\nmodule.exports = def;";
    try {
        fs_extra_1.default.writeFileSync(filepath, contents);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    return {
        filepath: filepath,
        filename: filename,
        contents: contents,
    };
}
exports.default = generateDefFile;
