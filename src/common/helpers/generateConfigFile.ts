import askInput from '../../cli/ask/ask-input';
import { askUtil } from '../../cli/ask';
import { DEFAPI_CONFIG_FILENAME, configKeys, DEFAULT_SRC_PATH } from '../constants';
import conprint from '../util/conprint';
import fileUtil from '../util/fileUtil';
import * as FS from 'fs-extra';
import { DefapiConfig } from '../../types';

export async function generateConfigFile(config: DefapiConfig) {
  const configPath = fileUtil.getConfigPath();
  const configExists = FS.existsSync(configPath);
  if (configExists) {
    const msg = `A ${DEFAPI_CONFIG_FILENAME} file already exists. Would you like to overwrite it? (y/n)`;
    const input = await askInput('input', msg);
    if (!askUtil.isYesInput(input)) {
      process.exit(0);
      return;
    }
  }

  let contents = `
module.exports = {
  "${configKeys.baseUri}": "${config.baseUri}",
  "${configKeys.srcPath}": "${config.srcPath ?? DEFAULT_SRC_PATH}"
}`;

  try {
    FS.writeFileSync(configPath, contents, { encoding: 'utf-8' });
    console.log(`${configPath} created`);
  } catch (e) {
    conprint.error(`[Error creating config file:]`);
    console.error(e);
  }
}