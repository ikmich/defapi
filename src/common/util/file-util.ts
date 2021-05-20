import { CONFIG_FILENAME, DEFAULT_SRC_PATH, DEFS_DIR_NAME } from '../constants';
import configUtil from './config-util';
import { DefapiConfig } from '../index';
import ut, { yes } from './index';
import { DefapiError } from '../errors';

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

  getSrcPath(conf?: DefapiConfig): string {
    let srcPath = ut.fn(() => {
      if (conf && yes(conf.srcPath)) {
        return conf.srcPath;
      }

      if (yes(configUtil.getSrcPath())) {
        return configUtil.getSrcPath();
      }

      return DEFAULT_SRC_PATH;
    });

    if (!FS.existsSync(srcPath)) throw new DefapiError('src path not found');
    return Path.resolve(this.getBaseDir(), srcPath);
  },

  getDefsDir(conf?: DefapiConfig): string {
    const srcPath = this.getSrcPath(conf);
    const defsDir = Path.resolve(srcPath, DEFS_DIR_NAME);
    FS.ensureDirSync(defsDir);
    return defsDir;
  },

  getJsob(filePath: string): object {
    if (FS.existsSync(filePath)) {
      const contents = FS.readFileSync(filePath, { encoding: 'utf-8' });
      return JSON.parse(contents);
    }
    return {};
  }
};

export default fileUtil;
