"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const get_endpoints_1 = require("../lib/get-endpoints");
const _util_1 = require("../../util/_util");
const generateDefFile_1 = __importDefault(require("../../helpers/generateDefFile"));
/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
function initDefs(app, config) {
    let result = {};
    let defsDir = file_util_1.default.getDefsDir();
    fs_extra_1.default.ensureDirSync(defsDir);
    let isDirEmpty;
    let entries = fs_extra_1.default.readdirSync(defsDir);
    isDirEmpty = !(Array.isArray(entries) && entries.length);
    if (!isDirEmpty) {
        result.message = "Endpoint defs dir is not empty";
        return result;
    }
    let defs = get_endpoints_1.getEndpoints(app);
    if (isDirEmpty) {
        for (let def of defs) {
            def = _util_1._def(def);
            if (_util_1.no(def.title)) {
                def.title = `${def.method} ${def.path}`;
            }
            // create endpoint def file
            generateDefFile_1.default(def);
        }
    }
    result.message = `Endpoint def files created successfully`;
    return result;
}
exports.default = initDefs;
