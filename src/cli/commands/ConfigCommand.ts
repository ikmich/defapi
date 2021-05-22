import BaseCommand from './BaseCommand';
import conprint from '../../common/util/conprint';
import fileUtil from '../../common/util/fileUtil';
import { _baseUri, yes } from '../../common/util';
import { generateConfigFile } from '../../common/util/generateConfigFile';
import configUtil from '../../common/util/configUtil';
import { FS } from '../../common/depds';
import { DefapiConfig } from '../../types';

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
