export const DEFAPI_CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = '.';

const __defapi = '__defapi';
export const DEFS_DIRNAME = `${__defapi}/defs/current`;
export const DEFS_DIR_PUBLIC_HTML = `${__defapi}/docs/html`;
// ----
export const API_PATH_ENDPOINTS = '/defapi/endpoints';
export const API_PATH_DOCS = '/defapi/docs/view';
export const API_PATH_GENERATE_DEFS = '/defapi/defs/generate';
// ----
export const excludedPaths = ['*', '/*', '*/'];
// ----
export const t_string = '@string';
export const t_number = '@number';
export const t_boolean = '@boolean';
export const t_object = '@object';
export const t_array = '@array';
export const t_json_string = '@json_string';
export const t_file = '@file';

// ----

export const SETTING_BASE_URI = '__defapi_baseUri';
export const SETTING_SRC_PATH = '__defapi_srcPath';

export const configKeys = {
  baseUri: 'baseUri',
  srcPath: 'srcPath',
  title: 'title',
  headers: 'headers'
};
