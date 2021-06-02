import configManager from './configManager';
import _util, { yes } from '../util';
import { DefapiError } from '../errors';
import { FS, Path } from '../depds';
import { DefapiConfig } from '../../types';
import {
  BASENAME_DEFAPI_HOME,
  CONFIG_FILENAME,
  DEFAULT_SRC_PATH,
  PATH_REL__DEFS_JSON_DIR,
  PATH_REL__DOCS_DIR
} from '../index';

const fileManager = {
  /**
   * Ensure the relevant defapi directories exist.
   */
  initDirs(conf?: DefapiConfig) {
    configManager.importConfig();
    const srcPath = this.getSrcPath(conf);
    const defapiHome = Path.join(srcPath, BASENAME_DEFAPI_HOME);
    const defsDir = Path.join(srcPath, PATH_REL__DEFS_JSON_DIR);
    const docsDir = Path.join(srcPath, PATH_REL__DOCS_DIR);
    FS.ensureDirSync(defapiHome);
    FS.ensureDirSync(defsDir);
    FS.ensureDirSync(docsDir);
  },
  getBaseDir() {
    return process.cwd();
  },

  getConfigFilePath() {
    const baseDir = process.cwd();
    return Path.join(baseDir, CONFIG_FILENAME);
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
    return Path.join(this.getBaseDir(), srcPath);
  },

  /**
   * Get filepath to the endpoint defs json files directory.
   * @param conf
   */
  getDefsJsonDir(conf?: DefapiConfig): string {
    const defsDir = Path.join(this.getSrcPath(conf), PATH_REL__DEFS_JSON_DIR);
    FS.ensureDirSync(defsDir);
    return defsDir;
  },

  /**
   * Get filepath to the docs directory.
   * @param conf
   */
  getDocsDir(conf?: DefapiConfig) {
    const docsDir = Path.join(this.getSrcPath(conf), PATH_REL__DOCS_DIR);
    FS.ensureDirSync(docsDir);
    return docsDir;
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
