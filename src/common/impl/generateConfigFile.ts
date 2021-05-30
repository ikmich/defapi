import conprint from '../util/conprint';
import fileManager from '../managers/fileManager';
import { DefapiConfig } from '../../types';
import objToWritableString from '../util/objToWritableString';

export function generateConfigFile(config: DefapiConfig) {
  const configPath = fileManager.getConfigFilePath();

  let contents = `module.exports = ${objToWritableString(config, 0)};`;

  try {
    fileManager.write(configPath, contents);
    return contents;
  } catch (e) {
    conprint.error(`[defapi.ERR] Error creating config file:`);
    console.error(e);
  }
}
