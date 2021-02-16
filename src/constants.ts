export const MANIFEST_FILENAME = "apidef-manifest.js";
export const CONFIG_FILENAME = "apidef-config.js";
export const DEFAULT_SRC_PATH = ".";
export const DEFS_DIR_NAME = "__apidef";
// ----

export const API_PATH_MANIFEST = "/apidef/manifest";
export const API_PATH_ENDPOINTS = "/apidef/endpoints";
export const API_PATH_ENDPOINTS_DL = "/apidef/endpoints/dl";
export const API_PATH_VIEW_DOCS = "/apidef/view";
export const API_PATH_INIT = "/apidef/init";

// ----

export const excludedPaths = [
  API_PATH_ENDPOINTS_DL,
  API_PATH_ENDPOINTS,
  API_PATH_MANIFEST,
  "*",
];

export const emptyApiDef = {
  baseUri: "",
  endpoints: [],
};

// ----

export const t_string = ":string";
export const t_number = ":number";
export const t_boolean = ":boolean";
export const t_object = ":object";
export const t_array = ":array";
export const t_json_string = ":json_string";
export const t_file = ":file";

// ----

export const SETTING_BASE_URI = "__apidef_baseUri";
export const SETTING_SRC_PATH = "__apidef_srcPath";

export const configKeys = {
  baseUri: "baseUri",
  srcPath: "srcPath",
};
