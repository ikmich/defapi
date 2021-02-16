"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var file_util_1 = __importDefault(require("../../util/file-util"));
var get_endpoints_1 = require("../lib/get-endpoints");
var _util_1 = require("../../util/_util");
var generateDefFile_1 = __importDefault(require("../../helpers/generateDefFile"));
/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
function initDefs(app, config) {
    var result = {};
    var defsDir = file_util_1.default.getDefsDir();
    fs_extra_1.default.ensureDirSync(defsDir);
    var isDirEmpty;
    var entries = fs_extra_1.default.readdirSync(defsDir);
    isDirEmpty = !(Array.isArray(entries) && entries.length);
    if (!isDirEmpty) {
        result.message = "Endpoint defs dir is not empty";
        return result;
    }
    var defs = get_endpoints_1.getEndpoints(app);
    if (isDirEmpty) {
        for (var _i = 0, defs_1 = defs; _i < defs_1.length; _i++) {
            var def = defs_1[_i];
            def = _util_1._def(def);
            if (_util_1.no(def.title)) {
                def.title = def.method + " " + def.path;
            }
            // create endpoint def file
            generateDefFile_1.default(def);
        }
    }
    result.message = "Endpoint def files created successfully";
    return result;
}
exports.default = initDefs;
