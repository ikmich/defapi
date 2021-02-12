import BaseCmd from "./BaseCmd";
import { configKeys, DEFAULT_SRC_PATH } from "../../../constants";
import conprint from "../helpers/conprint";
import askInput from "../ask/ask-input";
import fileUtil from "../../../util/file-util";
import { askUtil } from "../helpers/ask-util";
import { yes } from "../../../util/_util";
import { DocapiConfig } from "../../../api/meta";

const FS = require("fs-extra");

/**
 * Creates a docapi-config.json file
 */
export class ConfigCmd extends BaseCmd {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileUtil.getConfigPath();
    const configExists = FS.existsSync(configPath);

    let opts = {
      baseUri: this.options.baseUri ?? "",
      srcPath: this.options.srcPath ?? "",
    };

    const fnCreateDefaultConfig = async () => {
      if (configExists) {
        const msg =
          "A docapi-config.json file already exists. Would you like to overwrite it? (y/n)";
        const input = await askInput("input", msg);
        if (!askUtil.isYesInput(input)) {
          process.exit(0);
          return;
        }
      }

      let contents = `module.exports = {
  "${configKeys.base_uri}": "${opts.baseUri}",
  "${configKeys.src_path}": "${opts.srcPath ?? DEFAULT_SRC_PATH}"
}`;

      try {
        FS.writeFileSync(configPath, contents, { encoding: "utf-8" });
        console.log(`${configPath} created`);
      } catch (e) {
        conprint.error(`[Error creating config file:]`);
        console.error(e);
      }
    };

    if (configExists) {
      const config: DocapiConfig = require(configPath);
      let isUpdate = false;
      if (yes(opts.baseUri)) {
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
      await fnCreateDefaultConfig();
    }
  }
}
