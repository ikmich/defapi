import conprint from '../util/conprint';
import fileUtil from '../util/fileUtil';
import { DefapiConfig } from '../../types';
import objToWritableString from '../util/objToWritableString';

export async function generateConfigFile(config: DefapiConfig) {
  const configPath = fileUtil.getConfigFilePath();

  let contents = `module.exports = ${objToWritableString(config, 0)};`;

  try {
    fileUtil.write(configPath, contents);
    return contents;
  } catch (e) {
    conprint.error(`[defapi.ERR] Error creating config file:`);
    console.error(e);
  }
}
