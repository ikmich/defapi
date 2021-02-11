import {yes} from "./_util";
import {CONFIG_FILENAME, DEFAULT_SRC_PATH} from "../constants";
import FS from "fs";
import {DocapiConfig} from "../api/meta";
const Path = require('path');

const defaultConfig: DocapiConfig = {
  base_uri: '',
  src_path: DEFAULT_SRC_PATH
};

const configUtil = {

  getConfig(): DocapiConfig {
    try {
      const baseDir = process.cwd();
      let configPath = Path.resolve(baseDir, CONFIG_FILENAME);
      if (!FS.existsSync(configPath)) {
        return defaultConfig;
      }

      const contents = FS.readFileSync(configPath, 'utf-8').toString();
      return JSON.parse(contents);
    } catch (e) {
      console.error(e);
      return defaultConfig;
    }
  },

  getPropSrcPath(): string {
    const config = this.getConfig();
    if (yes(config.src_path)) {
      return config.src_path!.replace(/^\/+/, '');
    }
    return DEFAULT_SRC_PATH;
  },

  getPropBaseUri(): string {
    const config = this.getConfig();
    if (yes(config.base_uri)) return config.base_uri!;
    return '';
  }
};

export default configUtil;
