import { yes } from '../util';
import { DefapiConfig, Objectx } from '../../types';
import fileManager from './fileManager';
import {
  CONFIG_FILENAME,
  DEFAULT_ROUTE_PREFIX,
  DEFAULT_SRC_PATH,
  DEFAULT_TITLE,
  defaultConfig,
  PATH_COMMON_DIR,
  PATH_IMPORTED_CONFIG_FILE
} from '../index';
import { FS, Path } from '../depds';

const configManager = {
  getConfig(): DefapiConfig {
    try {
      let configPath = PATH_IMPORTED_CONFIG_FILE;
      if (!fileManager.exists(configPath)) {
        return defaultConfig;
      }

      const config: DefapiConfig = require(configPath) ?? {};

      if (!config.api.baseUri) {
        config.api.baseUri = '';
      } else if (typeof config.api.baseUri === 'function') {
        config.api.baseUri = config.api.baseUri();
      }

      if (!config.api.title) {
        config.api.title = DEFAULT_TITLE;
      }

      return Object.assign({}, config);
    } catch (e) {
      console.error(e);
      return defaultConfig;
    }
  },

  getBaseUri(): string {
    const config = this.getConfig();
    return <string>config.api.baseUri;
  },

  getTitle(): string {
    const config = this.getConfig();
    return config.api.title ?? DEFAULT_TITLE;
  },

  getApiRootPath() {
    const config = this.getConfig();
    let rootPath = config.api.rootPath?.trim();
    if (rootPath && rootPath.length) {
      return `/${rootPath.replace(/^\/+/, '').replace(/\/+$/, '')}`;
    }
    return '';
  },

  getDefapiRoutePrefix(): string {
    return DEFAULT_ROUTE_PREFIX;
  },

  getApiHeaders(): Objectx {
    const config = this.getConfig();
    return config.api.headers;
  },

  getApiAuthenticationHeaders(): Objectx {
    const config = this.getConfig();
    return config.api.authenticationHeaders;
  },

  processConfig() {
    if (this.checkConfig()) {
      this.importConfig();
    }
  },

  checkConfig() {
    const projectRoot = process.cwd();
    let defapiConfigPathInProject = Path.resolve(projectRoot, CONFIG_FILENAME);
    if (!FS.existsSync(defapiConfigPathInProject!)) {
      console.warn(
        `'${CONFIG_FILENAME}' file not found in project root. Run \`defapi init\` to create the file, then restart your project server.`
      );
      return false;
    }
    return true;
  },

  /**
   * Copy the file to the defapi project base, to prevent possible out-of-project import errors.
   */
  importConfig() {
    const projectRoot = process.cwd();
    let defapiConfigPathInProject = Path.resolve(projectRoot, CONFIG_FILENAME);

    const name = Path.basename(defapiConfigPathInProject);
    const dest = Path.join(PATH_COMMON_DIR, name);
    try {
      FS.copyFileSync(defapiConfigPathInProject!, dest!);
    } catch (e) {
      console.error(`[defapi.ERR] Could not copy \`${CONFIG_FILENAME}\``, e);
    }

    if (!fileManager.exists(dest)) {
      console.warn(`[defapi.WARN] Unable to process \`${CONFIG_FILENAME}\``);
    }
  }
};

export default configManager;
