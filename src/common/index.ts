import { Path } from './depds';
import { DefapiConfig } from '../types';

export const PATH_TO_COMMON_DIR = Path.join(__dirname);
export const CONFIG_FILENAME = 'defapi-config.js';
export const DEFAULT_SRC_PATH = '.';
const DEFAPI_DIR_BASENAME = '__defapi';
export const DEFS_DIR_PATH_REL = `${DEFAPI_DIR_BASENAME}/defs/current`;
export const DEFS_DIR_PUBLIC_HTML = `${DEFAPI_DIR_BASENAME}/docs/html`;
export const excludedPaths = ['*', '/*', '*/'];
export const configKeys: { [k in keyof DefapiConfig]: string } = {
  baseUri: 'baseUri',
  srcPath: 'srcPath',
  title: 'title',
  defaultHeaders: 'headers',
  routeName: 'routeName'
};
export const PATH_TO_DEFAPI_CONFIG_FILE = Path.join(__dirname, CONFIG_FILENAME);
export const DEFAULT_ROUTE_PATH = '/defapi';
export const defaultConfig: DefapiConfig = {
  baseUri: '',
  srcPath: DEFAULT_SRC_PATH,
  defaultHeaders: {},
  title: 'My API',
  routeName: DEFAULT_ROUTE_PATH
};
