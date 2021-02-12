import { yes } from "./_util";
import { CONFIG_FILENAME, DEFAULT_SRC_PATH } from "../constants";
import FS from "fs";
import { DocapiConfig } from "../api/meta";

const Path = require("path");

const defaultConfig: DocapiConfig = {
  baseUri: '',
  srcPath: DEFAULT_SRC_PATH
};

const configUtil = {

  getConfig(): DocapiConfig {
    try {
      const baseDir = process.cwd();
      let configPath = Path.resolve(baseDir, CONFIG_FILENAME);
      if (!FS.existsSync(configPath)) {
        return defaultConfig;
      }

      return require(configPath);
    } catch (e) {
      console.error(e);
      return defaultConfig;
    }
  },

  getPropSrcPath(): string {
    const config = this.getConfig();
    if (yes(config.srcPath)) {
      return config.srcPath!.replace(/^\/+/, '');
    }
    return DEFAULT_SRC_PATH;
  },

  getPropBaseUri(): string {
    const config = this.getConfig();
    if (yes(config.baseUri)) return config.baseUri!;
    return '';
  }
};

export default configUtil;
