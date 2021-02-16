"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateManifest = void 0;
const constants_1 = require("../constants");
const _util_1 = require("../util/_util");
const get_endpoints_1 = require("../api/lib/get-endpoints");
const parseApidefBaseDir_1 = __importDefault(require("./parseApidefBaseDir"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function generateManifest(input, app) {
    var _a;
    const baseUri = input.baseUri;
    const srcPath = (_a = input.srcPath) !== null && _a !== void 0 ? _a : '.';
    const baseDir = process.cwd();
    // ----
    let srcDir = path_1.default.resolve(baseDir, srcPath);
    if (!fs_extra_1.default.existsSync(srcDir)) {
        throw new Error('Unable to resolve src_path');
    }
    let apidefBaseDir = path_1.default.resolve(srcDir, constants_1.DEFS_DIR_NAME);
    fs_extra_1.default.ensureDirSync(apidefBaseDir);
    // ----
    let defaultDict = {};
    let manifestDict = {};
    let defaultDefs = get_endpoints_1.getEndpoints(app);
    let mergedDefs = [];
    let manifestDefs = [];
    let manifestFile = path_1.default.resolve(srcPath, constants_1.MANIFEST_FILENAME);
    if (fs_extra_1.default.existsSync(manifestFile)) {
        try {
            const ob = require(manifestFile);
            if (ob && Array.isArray(ob.endpoints)) {
                manifestDefs = ob.endpoints;
            }
        }
        catch (e) {
            console.log(`Possible invalid manifest file :: ${e.mesage}`);
        }
    }
    // [create default dict]
    if (Array.isArray(defaultDefs) && defaultDefs.length > 0) {
        defaultDefs.forEach((def) => {
            def = _util_1._def(def);
            const key = `${def.method} ${def.path}`;
            defaultDict[key] = def;
        });
    }
    // [create manifest dict]
    if (Array.isArray(manifestDefs) && manifestDefs.length > 0) {
        manifestDefs.forEach((def) => {
            def = _util_1._def(def);
            const key = `${def.method} ${def.path}`;
            manifestDict[key] = def;
        });
    }
    // [extend manifest dict from default dict]
    Object.keys(defaultDict).forEach((key) => {
        manifestDict[key] = Object.assign(Object.assign({}, manifestDict[key]), defaultDict[key]);
    });
    // [create mergedDefs array from manifestDict]
    Object.keys(manifestDict).forEach(key => {
        mergedDefs.push(manifestDict[key]);
    });
    // Read entries in apidefBaseDir and merge to manifest.
    mergedDefs = parseApidefBaseDir_1.default(apidefBaseDir, mergedDefs);
    let contents = `/**
* Generated apidef manifest.
*/
module.exports = {
  baseUri: '${baseUri}',
  endpoints: ${JSON.stringify(mergedDefs, null, 2)}
};`;
    try {
        fs_extra_1.default.writeFileSync(manifestFile, contents);
    }
    catch (e) {
        throw e;
        //return httpFail(res, e);
    }
    return { mergedDefs, manifestFile, contents };
}
exports.generateManifest = generateManifest;
