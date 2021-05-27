import { Path } from './depds';
import { DefapiConfig } from '../types';

export const PATH_TO_COMMON_DIR = Path.join(__dirname);
export const CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = '.';
const DEFAPI_DIR_BASENAME = '__defapi';
export const DEFS_DIR_PATH_REL = `${DEFAPI_DIR_BASENAME}/defs/current`;
export const excludedPaths = ['*', '/*', '*/'];
// export const configKeys: any = {
//   baseUri: 'baseUri',
//   srcPath: 'srcPath',
//   title: 'title',
//   defaultHeaders: 'headers',
//   'defapi.routePrefix': 'routePrefix'
// };
export const DEFAULT_ROUTE_PREFIX = '/defapi';
export const PATH_TO_IMPORTED_CONFIG_FILE = Path.join(__dirname, CONFIG_FILENAME);
export const defaultConfig: DefapiConfig = {
  baseUri: '',
  srcPath: DEFAULT_SRC_PATH,
  defaultHeaders: {},
  title: 'My API',
  /* Todo - Create 'api' section to hold baseUri, defaultHeaders, title, and other
   *   api related properties. Create 'project' section for project specific settings*/

  defapi: {
    routePrefix: DEFAULT_ROUTE_PREFIX
  }
};
