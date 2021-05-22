import { DEFAPI_CONFIG_FILENAME, DEFAULT_SRC_PATH, DEFS_DIRNAME } from '../constants';
import configUtil from './configUtil';
import ut, { yes } from './index';
import { DefapiError } from '../errors';
import { FS, Path } from '../depds';
import { DefapiConfig } from '../../types';

const fileUtil = {
  getBaseDir() {
    return process.cwd();
  },

  getConfigPath() {
    const baseDir = process.cwd();
    return Path.resolve(baseDir, DEFAPI_CONFIG_FILENAME);
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
    const defsDir = Path.resolve(srcPath, DEFS_DIRNAME);
    FS.ensureDirSync(defsDir);
    return defsDir;
  }
};

export default fileUtil;
