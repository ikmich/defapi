import { yes } from './index';
import { DefapiConfig, Objectx } from '../../types';
import fileUtil from './fileUtil';
import {
  CONFIG_FILENAME,
  DEFAULT_SRC_PATH,
  defaultConfig,
  PATH_TO_COMMON_DIR,
  PATH_TO_DEFAPI_CONFIG_FILE
} from '../index';
import { FS, Path } from '../depds';

const configUtil = {
  getConfig(): DefapiConfig {
    try {
      let configPath = PATH_TO_DEFAPI_CONFIG_FILE;
      if (!fileUtil.exists(configPath)) {
        return defaultConfig;
      }

      const config: DefapiConfig = require(configPath);
      if (typeof config.baseUri === 'function') {
        config.baseUri = config.baseUri();
      }

      if (!config.baseUri) {
        config.baseUri = '';
      }

      return config;
    } catch (e) {
      console.error(e);
      return defaultConfig;
    }
  },

  getSrcPath(): string {
    const config = this.getConfig();
    if (yes(config.srcPath)) {
      return config.srcPath!.replace(/^\/+/, '');
    }
    return DEFAULT_SRC_PATH;
  },

  getBaseUri(): string {
    const config = this.getConfig();
    if (config.baseUri) {
      if (typeof config.baseUri === 'string') {
        return config.baseUri;
      }

      if (typeof config.baseUri === 'function') {
        return config.baseUri();
      }
    }

    return '';
  },

  getTitle(): string {
    const config = this.getConfig();
    return config.title ?? '';
  },

  getRouteName(): string {
    const config = this.getConfig();
    return config.routeName ?? '';
  },

  getHeaders(): Objectx {
    const config = this.getConfig();
    if (typeof config.defaultHeaders === 'function') {
      return config.defaultHeaders();
    } else {
      return config.defaultHeaders;
    }
  },

  checkConfig() {
    const projectRoot = process.cwd();
    let defapiConfigPathInProject = Path.resolve(projectRoot, CONFIG_FILENAME);
    if (!FS.existsSync(defapiConfigPathInProject)) {
      console.warn(
        `${CONFIG_FILENAME} file not found in project root. Run \`defapi init\` to create the file, then restart your project server.`
      );
    }
  },

  importConfig() {
    const projectRoot = process.cwd();
    let defapiConfigPathInProject = Path.resolve(projectRoot, CONFIG_FILENAME);
    /*
     * Copy the file to the defapi project base, to prevent possible out-of-project import errors.
     */
    const name = Path.basename(defapiConfigPathInProject);
    const dest = Path.join(PATH_TO_COMMON_DIR, name);
    try {
      FS.copyFileSync(defapiConfigPathInProject, dest);
    } catch (e) {
      console.error(`[defapi.ERR] Could not copy \`${CONFIG_FILENAME}\``, e);
    }

    if (!fileUtil.exists(dest)) {
      console.warn(`[defapi.WARN] Unable to process \`${CONFIG_FILENAME}\``);
    }
  }
};

export default configUtil;
