export const MANIFEST_FILENAME = 'docapi-manifest.js';
export const CONFIG_FILENAME = 'docapi-config.json';
export const DEFAULT_SRC_PATH = '.';
export const DEFS_DIR_NAME = '__docapi';
// ----

export const API_PATH_DOCAPI = '/docapi';
export const API_PATH_ENDPOINTS = '/docapi/endpoints';
export const API_PATH_ENDPOINTS_DL = '/docapi/endpoints/dl';
export const API_PATH_VIEW_DOCS = '/docapi/view';

// ----

export const excludedPaths = [
  API_PATH_ENDPOINTS_DL,
  API_PATH_ENDPOINTS,
  API_PATH_DOCAPI,
  '*'
];

export const emptyApiDef = {
  baseUri: '',
  endpoints: []
};

// ----

export const t_string = ':string';
export const t_number = ':number';
export const t_boolean = ':boolean';
export const t_object = ':object';
export const t_array = ':array';
export const t_json_string = ':json_string';
export const t_file = ':file';

// ----

export const SETTING_BASE_URI = '__docapi_base_uri';
export const SETTING_SRC_PATH = '__docapi_src_path';

export const configKeys = {
  base_uri: 'base_uri',
  src_path: 'src_path'
};
