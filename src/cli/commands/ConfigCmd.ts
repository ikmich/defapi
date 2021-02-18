import BaseCmd from "./BaseCmd";
import { DEFAULT_SRC_PATH } from "../../constants";
import conprint from "../cli-helpers/conprint";
import fileUtil from "../../util/file-util";
import { _baseUri, yes } from "../../util/_util";
import { DefapiConfig } from "../../index";
import { generateConfigFile } from "../../helpers/generateConfigFile";

const FS = require("fs-extra");

/**
 * Command handler for the `defapi config` command. Creates a defapi-config.json file
 */
export class ConfigCmd extends BaseCmd {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileUtil.getConfigPath();
    const configExists = FS.existsSync(configPath);

    let opts = {
      baseUri: _baseUri(this.options.baseUri ?? ""),
      srcPath: yes(this.options.srcPath)
        ? this.options.srcPath
        : DEFAULT_SRC_PATH,
    };

    if (configExists) {
      const config: DefapiConfig = require(configPath);
      let isUpdate = false;
      if (yes(opts.baseUri)) {
        conprint.notice("Setting config.baseUri...");
        isUpdate = configExists;
        config.baseUri = opts.baseUri;
      }

      if (yes(opts.srcPath)) {
        conprint.notice("Setting config.srcPath...");
        isUpdate = configExists;
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
