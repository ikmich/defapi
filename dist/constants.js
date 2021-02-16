"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configKeys = exports.SETTING_SRC_PATH = exports.SETTING_BASE_URI = exports.t_file = exports.t_json_string = exports.t_array = exports.t_object = exports.t_boolean = exports.t_number = exports.t_string = exports.emptyApiDef = exports.excludedPaths = exports.API_PATH_INIT = exports.API_PATH_VIEW_DOCS = exports.API_PATH_ENDPOINTS_DL = exports.API_PATH_ENDPOINTS = exports.API_PATH_MANIFEST = exports.DEFS_DIR_NAME = exports.DEFAULT_SRC_PATH = exports.CONFIG_FILENAME = exports.MANIFEST_FILENAME = void 0;
exports.MANIFEST_FILENAME = "apidef-manifest.js";
exports.CONFIG_FILENAME = "apidef-config.js";
exports.DEFAULT_SRC_PATH = ".";
exports.DEFS_DIR_NAME = "__apidef";
// ----
exports.API_PATH_MANIFEST = "/apidef/manifest";
exports.API_PATH_ENDPOINTS = "/apidef/endpoints";
exports.API_PATH_ENDPOINTS_DL = "/apidef/endpoints/dl";
exports.API_PATH_VIEW_DOCS = "/apidef/view";
exports.API_PATH_INIT = "/apidef/init";
// ----
exports.excludedPaths = [
    exports.API_PATH_ENDPOINTS_DL,
    exports.API_PATH_ENDPOINTS,
    exports.API_PATH_MANIFEST,
    "*",
];
exports.emptyApiDef = {
    baseUri: "",
    endpoints: [],
};
// ----
exports.t_string = ":string";
exports.t_number = ":number";
exports.t_boolean = ":boolean";
exports.t_object = ":object";
exports.t_array = ":array";
exports.t_json_string = ":json_string";
exports.t_file = ":file";
// ----
exports.SETTING_BASE_URI = "__apidef_baseUri";
exports.SETTING_SRC_PATH = "__apidef_srcPath";
exports.configKeys = {
    baseUri: "baseUri",
    srcPath: "srcPath",
};
