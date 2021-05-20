import { yes } from './index';
import { CONFIG_FILENAME, DEFAULT_SRC_PATH } from '../constants';
import FS from 'fs';
import { DefapiConfig, Objectx } from '../index';

const Path = require('path');

const defaultConfig: DefapiConfig = {
  baseUri: '',
  srcPath: DEFAULT_SRC_PATH
};

const configUtil = {
  getConfig(): DefapiConfig {
    try {
      const baseDir = process.cwd();

      let configPath = Path.resolve(baseDir, CONFIG_FILENAME);
      if (!FS.existsSync(configPath)) {
        return defaultConfig;
      }

      const name = Path.basename(configPath)
      const dest = Path.join(__dirname, name);
      FS.copyFileSync(configPath, dest);
      if (FS.existsSync(dest)) {
        const conf = require(dest);
        console.log(conf);
      }

      // const config: DefapiConfig = require(configPath);
      // if (typeof config.baseUri === 'function') {
      //   config.baseUri = config.baseUri();
      // }
      //
      // if (!config.baseUri) {
      //   config.baseUri = '';
      // }
      //
      // return config;
      return {};
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
