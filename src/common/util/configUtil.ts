import { yes } from './index';
import { DEFAULT_SRC_PATH } from '../constants';
import FS from 'fs';
import { PATH_TO_DEFAPI_CONFIG_FILE } from '../index';
import { DefapiConfig, Objectx } from '../../types';

const defaultConfig: DefapiConfig = {
  baseUri: '',
  srcPath: DEFAULT_SRC_PATH
};

const configUtil = {
  getConfig(): DefapiConfig {
    try {
      let configPath = PATH_TO_DEFAPI_CONFIG_FILE;
      if (!FS.existsSync(configPath)) {
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
      // return {};
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

  getHeaders(): Objectx {
    const config = this.getConfig();
    if (typeof config.headers === 'function') {
      return config.headers();
    } else {
      return config.headers;
    }
  }
};

export default configUtil;
