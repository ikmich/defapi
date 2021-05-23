import conprint from '../util/conprint';
import fileUtil from '../util/fileUtil';
import { DefapiConfig } from '../../types';
import objToWritableString from '../util/objToWritableString';
import { configKeys, DEFAULT_SRC_PATH } from '../index';

export async function generateConfigFile(config: DefapiConfig) {
  const configPath = fileUtil.getConfigFilePath();

  let contents = `module.exports = {
  "${configKeys.baseUri}": "${config.baseUri}",
  "${configKeys.srcPath}": "${config.srcPath ?? DEFAULT_SRC_PATH}",
  "${configKeys.title}":"${config.title}",
  "${configKeys.defaultHeaders}":${objToWritableString(config.defaultHeaders, 1)},
  "${configKeys.routeName}":"${config.routeName}"
}`;

  try {
    fileUtil.write(configPath, contents);
  } catch (e) {
    conprint.error(`[defapi.ERR] Error creating config file:`);
    console.error(e);
  }
}
