import BaseCommand from './BaseCommand';
import conprint from '../../util/conprint';
import fileUtil from '../../util/file-util';
import { _baseUri, yes } from '../../util';
import { DefapiConfig } from '../../index';
import { generateConfigFile } from '../../util/generate-config-file';
import configUtil from '../../util/config-util';

const FS = require('fs-extra');

/**
 * Command handler for the `defapi config` command. Creates a defapi-config.json file
 */
export class ConfigCommand extends BaseCommand {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileUtil.getConfigPath();
    const configExists = FS.existsSync(configPath);

    let opts = {
      baseUri: _baseUri(this.options.baseUri ?? ''),
      srcPath: this.options.srcPath
    };

    if (configExists) {
      const config: DefapiConfig = configUtil.getConfig();
      let isUpdate = false;

      if (yes(this.options.baseUri)) {
        conprint.notice('Setting config.baseUri...');
        isUpdate = true;
        config.baseUri = opts.baseUri;
      }

      if (yes(opts.srcPath)) {
        conprint.notice('Setting config.srcPath...');
        isUpdate = true;
        config.srcPath = opts.srcPath;
      }

      if (isUpdate) {
        // write new values back to file.
        const contents = `module.exports = ${JSON.stringify(config, null, 2)}`;
        FS.writeFileSync(configPath, contents);
      }

      conprint.info(JSON.stringify(config, null, 2));
    } else {
      // create default config
      await generateConfigFile(opts);
    }
  }
}
