export declare const MANIFEST_FILENAME = "apidef-manifest.js";
export declare const CONFIG_FILENAME = "apidef-config.js";
export declare const DEFAULT_SRC_PATH = ".";
export declare const DEFS_DIR_NAME = "__apidef";
export declare const API_PATH_MANIFEST = "/apidef/manifest";
export declare const API_PATH_ENDPOINTS = "/apidef/endpoints";
export declare const API_PATH_ENDPOINTS_DL = "/apidef/endpoints/dl";
export declare const API_PATH_VIEW_DOCS = "/apidef/view";
export declare const API_PATH_INIT = "/apidef/init";
export declare const excludedPaths: string[];
export declare const emptyApiDef: {
    baseUri: string;
    endpoints: never[];
};
export declare const t_string = ":string";
export declare const t_number = ":number";
export declare const t_boolean = ":boolean";
export declare const t_object = ":object";
export declare const t_array = ":array";
export declare const t_json_string = ":json_string";
export declare const t_file = ":file";
export declare const SETTING_BASE_URI = "__apidef_baseUri";
export declare const SETTING_SRC_PATH = "__apidef_srcPath";
export declare const configKeys: {
    baseUri: string;
    srcPath: string;
};
