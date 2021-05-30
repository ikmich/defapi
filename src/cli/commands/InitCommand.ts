import BaseCommand from './BaseCommand';
import fileUtil from '../../common/util/fileUtil';
import { DefapiConfig } from '../../types';
import askInput from '../ask/ask-input';
import { askUtil } from '../ask';
import conprint from '../../common/util/conprint';
import { CONFIG_FILENAME, defaultConfig } from '../../common';
import askSelect from '../ask/ask-select';
import { deployDocsHtmlClient } from '../../common/impl/deployDocsHtmlClient';

/**
 * Command handler for the `defapi init` command. Creates a defapi-config.js file
 */
export class InitCommand extends BaseCommand {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileUtil.getConfigFilePath();
    const hasConfigFile = fileUtil.exists(configPath);

    let initConfig: DefapiConfig = {
      ...defaultConfig,
      project: {
        srcPath: this.options.srcPath ?? '.'
      }
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

    /* Ask user to pick project source root dir */
    const OPT_PROJECT_ROOT = '<project root>';
    const OPT_PROJECT_ROOT__SRC = '<project root>/src';
    const ASK_SELECT_OPTS_MAP: any = {
      [OPT_PROJECT_ROOT]: '.',
      [OPT_PROJECT_ROOT__SRC]: './src'
    };

    const choice: any = await askSelect(
      'select-src-path',
      'Which of these is the folder for your project source files?',
      [OPT_PROJECT_ROOT, OPT_PROJECT_ROOT__SRC, 'None of the above']
    );

    if (Array.isArray(choice) && Object.keys(ASK_SELECT_OPTS_MAP).includes(choice[0])) {
      initConfig.project.srcPath = ASK_SELECT_OPTS_MAP[choice[0]];
    }

    fileUtil.initDirs(initConfig);

    conprint.info(`Success! ${CONFIG_FILENAME} created in project root.`);

    deployDocsHtmlClient();
  }
}
