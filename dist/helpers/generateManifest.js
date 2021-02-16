"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateManifest = void 0;
var constants_1 = require("../constants");
var _util_1 = require("../util/_util");
var get_endpoints_1 = require("../api/lib/get-endpoints");
var parseApidefBaseDir_1 = __importDefault(require("./parseApidefBaseDir"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
function generateManifest(input, app) {
    var _a;
    var baseUri = input.baseUri;
    var srcPath = (_a = input.srcPath) !== null && _a !== void 0 ? _a : '.';
    var baseDir = process.cwd();
    // ----
    var srcDir = path_1.default.resolve(baseDir, srcPath);
    if (!fs_extra_1.default.existsSync(srcDir)) {
        throw new Error('Unable to resolve src_path');
    }
    var apidefBaseDir = path_1.default.resolve(srcDir, constants_1.DEFS_DIR_NAME);
    fs_extra_1.default.ensureDirSync(apidefBaseDir);
    // ----
    var defaultDict = {};
    var manifestDict = {};
    var defaultDefs = get_endpoints_1.getEndpoints(app);
    var mergedDefs = [];
    var manifestDefs = [];
    var manifestFile = path_1.default.resolve(srcPath, constants_1.MANIFEST_FILENAME);
    if (fs_extra_1.default.existsSync(manifestFile)) {
        try {
            var ob = require(manifestFile);
            if (ob && Array.isArray(ob.endpoints)) {
                manifestDefs = ob.endpoints;
            }
        }
        catch (e) {
            console.log("Possible invalid manifest file :: " + e.mesage);
        }
    }
    // [create default dict]
    if (Array.isArray(defaultDefs) && defaultDefs.length > 0) {
        defaultDefs.forEach(function (def) {
            def = _util_1._def(def);
            var key = def.method + " " + def.path;
            defaultDict[key] = def;
        });
    }
    // [create manifest dict]
    if (Array.isArray(manifestDefs) && manifestDefs.length > 0) {
        manifestDefs.forEach(function (def) {
            def = _util_1._def(def);
            var key = def.method + " " + def.path;
            manifestDict[key] = def;
        });
    }
    // [extend manifest dict from default dict]
    Object.keys(defaultDict).forEach(function (key) {
        manifestDict[key] = __assign(__assign({}, manifestDict[key]), defaultDict[key]);
    });
    // [create mergedDefs array from manifestDict]
    Object.keys(manifestDict).forEach(function (key) {
        mergedDefs.push(manifestDict[key]);
    });
    // Read entries in apidefBaseDir and merge to manifest.
    mergedDefs = parseApidefBaseDir_1.default(apidefBaseDir, mergedDefs);
    var contents = "/**\n* Generated apidef manifest.\n*/\nmodule.exports = {\n  baseUri: '" + baseUri + "',\n  endpoints: " + JSON.stringify(mergedDefs, null, 2) + "\n};";
    try {
        fs_extra_1.default.writeFileSync(manifestFile, contents);
    }
    catch (e) {
        throw e;
        //return httpFail(res, e);
    }
    return { mergedDefs: mergedDefs, manifestFile: manifestFile, contents: contents };
}
exports.generateManifest = generateManifest;
