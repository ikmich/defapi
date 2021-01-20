import {CONFIG_FILENAME, DEFS_DIR_NAME} from "../constants";
import configUtil from "./config-util";

const Path = require('path');
const FS = require('fs-extra');

const fileUtil = {
  getBaseDir() {
    return process.cwd();
  },

  getConfigPath() {
    const baseDir = process.cwd();
    return Path.resolve(baseDir, CONFIG_FILENAME);
  },

  getSrcPath(): string {
    let srcPath = configUtil.getPropSrcPath();
    if (!FS.existsSync(srcPath)) throw new Error('src path not found');
    return Path.resolve(this.getBaseDir(), srcPath);
  },

  getDefsDir(): string {
    const srcPath = this.getSrcPath();
    const defsDir = Path.resolve(srcPath, DEFS_DIR_NAME);
    FS.ensureDirSync(defsDir);
    return defsDir;
  }
};

export default fileUtil;
