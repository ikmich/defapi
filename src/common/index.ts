import { Path } from './depds';
import { DefapiConfig } from '../types';

export const PATH__COMMON_DIR = Path.join(__dirname);
export const CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = '.';

// Name of base defapi folder within the project src root.
export const BASENAME_DEFAPI_HOME = '__defapi';

/**
 * Relative path from project src to folder containing endpoint def json files.
 */
export const PATH_REL_DEFS_DIR = `${BASENAME_DEFAPI_HOME}/current/defs`;

export const PATH_HTML_CLIENT_DIR = Path.join(__dirname, '../../client/dist');
export const PATH_HTML_CLIENT_FILE = Path.join(PATH_HTML_CLIENT_DIR, '/index.html');
export const PATH_HTML_CLIENT_REPOSITORY = Path.join(PATH_HTML_CLIENT_DIR, '/repository.json');

export const excludedPaths = ['*', '/*', '*/'];
export const DEFAULT_ROUTE_PREFIX = '/defapi';
export const PATH_IMPORTED_CONFIG_FILE = Path.join(__dirname, CONFIG_FILENAME);
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

export const STOREKEY_API_CONFIG = 'config.api';
