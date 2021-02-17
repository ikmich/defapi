import BaseCmd from "./BaseCmd";
import { configKeys, DEFAULT_SRC_PATH } from "../../constants";
import conprint from "../cli-helpers/conprint";
import askInput from "../lib/ask/ask-input";
import fileUtil from "../../util/file-util";
import { askUtil } from "../cli-helpers/ask-util";
import {_baseUri, yes} from "../../util/_util";
import {ApidefConfig} from "../../index";

const FS = require("fs-extra");

/**
 * Command handler for the `apidef config` command. Creates a apidef-config.json file
 */
export class ConfigCmd extends BaseCmd {
  async run(): Promise<void> {
    await super.run();

    const configPath = fileUtil.getConfigPath();
    const configExists = FS.existsSync(configPath);

    let opts = {
      baseUri: _baseUri(this.options.baseUri ?? ""),
      srcPath: this.options.srcPath ?? "",
    };

    const fnCreateDefaultConfig = async () => {
      if (configExists) {
        const msg =
          "An apidef-config.json file already exists. Would you like to overwrite it? (y/n)";
        const input = await askInput("input", msg);
        if (!askUtil.isYesInput(input)) {
          process.exit(0);
          return;
        }
      }

      let contents = `
module.exports = {
  "${configKeys.baseUri}": "${opts.baseUri}",
  "${configKeys.srcPath}": "${opts.srcPath ?? DEFAULT_SRC_PATH}"
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
      const config: ApidefConfig = require(configPath);
      let isUpdate = false;
      if (yes(opts.baseUri)) {
        conprint.notice("Setting config.baseUri...");
        isUpdate = true;
        config.baseUri = opts.baseUri;
      }

      if (yes(opts.srcPath)) {
        conprint.notice("Setting config.srcPath...");
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
