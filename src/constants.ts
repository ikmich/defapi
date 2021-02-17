export const MANIFEST_FILENAME = "defapi-manifest.js";
export const CONFIG_FILENAME = "defapi-config.js";
export const DEFAULT_SRC_PATH = ".";
export const DEFS_DIR_NAME = "__defapi";
// ----

export const API_PATH_MANIFEST = "/defapi/manifest";
export const API_PATH_ENDPOINTS = "/defapi/endpoints";
export const API_PATH_ENDPOINTS_DL = "/defapi/endpoints/dl";
export const API_PATH_VIEW_DOCS = "/defapi/view";
export const API_PATH_INIT = "/defapi/init";

// ----

export const excludedPaths = [
  API_PATH_ENDPOINTS_DL,
  API_PATH_ENDPOINTS,
  API_PATH_MANIFEST,
  "*",
];

// ----

export const t_string = ":string";
export const t_number = ":number";
export const t_boolean = ":boolean";
export const t_object = ":object";
export const t_array = ":array";
export const t_json_string = ":json_string";
export const t_file = ":file";

// ----

export const SETTING_BASE_URI = "__defapi_baseUri";
export const SETTING_SRC_PATH = "__defapi_srcPath";

export const configKeys = {
  baseUri: "baseUri",
  srcPath: "srcPath",
};
