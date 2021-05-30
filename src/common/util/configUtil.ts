import { yes } from './index';
import { DefapiConfig, Objectx } from '../../types';
import fileUtil from './fileUtil';
import {
  CONFIG_FILENAME,
  DEFAULT_SRC_PATH,
  defaultConfig,
  PATH__COMMON_DIR,
  PATH__IMPORTED_CONFIG_FILE
} from '../index';
import { FS, Path } from '../depds';

const configUtil = {
  getConfig(): DefapiConfig {
    try {
      let configPath = PATH__IMPORTED_CONFIG_FILE;
      if (!fileUtil.exists(configPath)) {
        return defaultConfig;
      }

      const config: DefapiConfig = require(configPath) ?? {};
      if (typeof config.api.baseUri === 'function') {
        config.api.baseUri = config.api.baseUri();
      }

      if (!config.api.baseUri) {
        config.api.baseUri = '';
      }

      return config;
    } catch (e) {
      console.error(e);
      return defaultConfig;
    }
  },

  getSrcPath(): string {
    const config = this.getConfig();
    if (yes(config.project.srcPath)) {
      // Remove leading slash - value in config should be a relative path.
      return config.project.srcPath!.replace(/^\/+/, '');
    }
    return DEFAULT_SRC_PATH;
  },

  getBaseUri(): string {
    const config = this.getConfig();
    if (config.api.baseUri) {
      if (typeof config.api.baseUri === 'string') {
        return config.api.baseUri;
      }

      if (typeof config.api.baseUri === 'function') {
        return config.api.baseUri();
      }
    }

    return '';
  },

  getTitle(): string {
    const config = this.getConfig();
    return config.api.title ?? '';
  },

  getDefapiRoutePrefix(): string {
    const config = this.getConfig();
    return config.defapi.routePrefix ?? '';
  },

  getHeaders(): Objectx {
    const config = this.getConfig();
    if (typeof config.api.defaultHeaders === 'function') {
      return config.api.defaultHeaders();
    } else {
      return config.api.defaultHeaders;
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

  /**
   * Copy the file to the defapi project base, to prevent possible out-of-project import errors.
   */
  importConfig() {
    const projectRoot = process.cwd();
    let defapiConfigPathInProject = Path.resolve(projectRoot, CONFIG_FILENAME);

    const name = Path.basename(defapiConfigPathInProject);
    const dest = Path.join(PATH__COMMON_DIR, name);
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
