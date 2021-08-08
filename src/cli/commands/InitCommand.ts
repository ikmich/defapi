import BaseCommand from './BaseCommand';
import fileManager from '../../common/managers/fileManager';
import { DefapiConfig } from '../../types';
import askInput from '../ask/ask-input';
import { askUtil } from '../ask';
import conprint from '../../common/util/conprint';
import { CONFIG_FILENAME, defaultConfig } from '../../common';
import { generateConfigFile } from '../../common/impl/generateConfigFile';

/**
 * Command handler for the `defapi init` command. Creates a defapi-config.js file
 */
export class InitCommand extends BaseCommand {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileManager.getConfigFilePath();
    const hasConfigFile = fileManager.exists(configPath);

    let initConfig: DefapiConfig = {
      ...defaultConfig
    };

    if (hasConfigFile) {
      const msg = `${CONFIG_FILENAME} already exists. Would you like to overwrite it? (y/n)`;
      const input = await askInput('input', msg);
      if (!askUtil.isYesInput(input)) {
        /* User does not want to overwrite their config file. Do nothing. */
        process.exit(0);
        return;
      }
    }

    generateConfigFile(initConfig);

    fileManager.initDirs(initConfig);

    conprint.info(`Success! ${CONFIG_FILENAME} created in project root.`);
  }
}
