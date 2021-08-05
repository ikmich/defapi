import configManager from './configManager';
import _util, { yes } from '../util';
import { DefapiError } from '../errors';
import { FS, Path } from '../depds';
import { DefapiConfig } from '../../types';
import { CONFIG_FILENAME, DEFAULT_SRC_PATH, PATH_DEFAPI_HOME, PATH_DEFS_DIR } from '../index';

const fileManager = {
  /**
   * Ensure the relevant defapi directories exist.
   */
  initDirs(conf?: DefapiConfig) {
    configManager.importConfig();

    if (PATH_DEFAPI_HOME == null) {
      throw new DefapiError('defapi home path not set');
    }
    FS.ensureDirSync(PATH_DEFAPI_HOME);

    if (PATH_DEFS_DIR == null) {
      throw new DefapiError('defs dir path not set');
    }

    FS.ensureDirSync(PATH_DEFS_DIR);
  },

  getProjectRoot() {
    return process.cwd();
  },

  getConfigFilePath() {
    return Path.join(process.cwd(), CONFIG_FILENAME);
  },

  getSrcPath(conf?: DefapiConfig): string {
    let srcPath = _util.fn(() => {
      if (conf && yes(conf.project.srcPath)) {
        return conf.project.srcPath;
      }

      if (yes(configManager.getSrcPath())) {
        return configManager.getSrcPath();
      }

      return DEFAULT_SRC_PATH;
    });

    if (!FS.existsSync(srcPath)) throw new DefapiError('srcPath not found');
    return Path.join(this.getProjectRoot(), srcPath);
  },

  /**
   * Get filepath to the endpoint defs json files directory.
   * @param conf
   */
  getDefsDir(conf?: DefapiConfig): string {
    if (PATH_DEFS_DIR == null) {
      throw new DefapiError('defs dir path not set');
    }

    FS.ensureDirSync(PATH_DEFS_DIR);
    return PATH_DEFS_DIR;
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
  },

  create(filepath: string) {
    FS.createFileSync(filepath);
  }
};

export default fileManager;
