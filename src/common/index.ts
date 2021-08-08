import { Path } from './depds';
import { DefapiConfig } from '../types';

export const DEFAULT_TITLE = 'My API';
export const PATH_COMMON_DIR = Path.join(__dirname);
export const CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = process.cwd();

// Name of base defapi folder within the project root.
export const DEFAPI_HOME_DIRNAME = '__defapi';

export const PATH_DEFAPI_HOME = Path.join(process.cwd(), DEFAPI_HOME_DIRNAME);

/**
 * Relative path from project src to folder containing endpoint def json files.
 */
export const PATH_DEFS_DIR = Path.join(PATH_DEFAPI_HOME, 'current/defs');

export const excludedPaths = ['*', '/*', '*/'];
export const DEFAULT_ROUTE_PREFIX = '/defapi';
export const PATH_IMPORTED_CONFIG_FILE = Path.join(__dirname, CONFIG_FILENAME);
export const defaultConfig: DefapiConfig = {
  api: {
    baseUri: '',
    headers: {},
    authenticationHeaders: {},
    title: DEFAULT_TITLE
  }
};

export const STOREKEY_API_CONFIG = 'config.api';
export const STOREKEY_DEFAPI_CONFIG = 'defapi.config';
