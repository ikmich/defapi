import configUtil from './configUtil';
import _util, { yes } from './index';
import { DefapiError } from '../errors';
import { FS, Path } from '../depds';
import { DefapiConfig } from '../../types';
import { CONFIG_FILENAME, DEFAULT_SRC_PATH, DEFS_DIR_PATH_REL } from '../index';

const fileUtil = {
  getBaseDir() {
    return process.cwd();
  },

  getConfigFilePath() {
    const baseDir = process.cwd();
    return Path.resolve(baseDir, CONFIG_FILENAME);
  },

  getSrcPath(conf?: DefapiConfig): string {
    let srcPath = _util.fn(() => {
      if (conf && yes(conf.srcPath)) {
        return conf.srcPath;
      }

      if (yes(configUtil.getSrcPath())) {
        return configUtil.getSrcPath();
      }

      return DEFAULT_SRC_PATH;
    });

    if (!FS.existsSync(srcPath)) throw new DefapiError('srcPath not found');
    return Path.resolve(this.getBaseDir(), srcPath);
  },

  getDefsDir(conf?: DefapiConfig): string {
    const srcPath = this.getSrcPath(conf);
    const defsDir = Path.resolve(srcPath, DEFS_DIR_PATH_REL);
    FS.ensureDirSync(defsDir);
    return defsDir;
  },

  exists(filepath: string): boolean {
    return FS.existsSync(filepath);
  },

  /**
   * Read a file's contents
   * @param filepath
   */
  read(filepath: string): string | null {
    try {
      return FS.readFileSync(filepath, { encoding: 'utf-8' });
    } catch (e) {
      return null;
    }
  },

  write(filepath: string, contents: string) {
    FS.writeFileSync(filepath, contents, { encoding: 'utf-8' });
  }
};

export default fileUtil;
