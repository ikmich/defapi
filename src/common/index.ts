import { Path } from './depds';
import { DefapiConfig } from '../types';

export const PATH__COMMON_DIR = Path.join(__dirname);
export const CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = '.';

// Name of base defapi folder within the project src root.
export const BASENAME_DEFAPI_HOME = '__defapi';

// Relative path from project src to folder containing endpoint def json files.
export const PATH_REL__DEFS_JSON_DIR = `${BASENAME_DEFAPI_HOME}/defs/current`;

// Relative path from project src to folder containing defapi html view files.
export const PATH_REL__DOCS_DIR = `${BASENAME_DEFAPI_HOME}/docs`;

// Path to html client
export const PATH__HTML_CLIENT = Path.join(__dirname, '../../client/build');

export const excludedPaths = ['*', '/*', '*/'];
export const DEFAULT_ROUTE_PREFIX = '/defapi';
export const PATH__IMPORTED_CONFIG_FILE = Path.join(__dirname, CONFIG_FILENAME);
export const defaultConfig: DefapiConfig = {
  api: {
    baseUri: '',
    defaultHeaders: {},
    title: 'My API'
  },
  project: {
    srcPath: DEFAULT_SRC_PATH
  },
  defapi: {
    routePrefix: DEFAULT_ROUTE_PREFIX
  }
};

export const STORE_API_CONFIG = 'config.api';
