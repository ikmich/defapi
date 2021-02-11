import BaseCmd from "./BaseCmd";
import {configKeys, DEFAULT_SRC_PATH} from "../../../constants";
import conprint from "../helpers/conprint";
import askInput from "../ask/ask-input";
import fileUtil from "../../../util/file-util";
import {askUtil} from "../helpers/ask-util";
import {devLog} from "../../../util/_util";

const FS = require('fs-extra');
const Path = require('path');

/**
 * Creates a docapi-config.json file
 */
export class InitCmd extends BaseCmd {
  async run(): Promise<void> {
    devLog('>> InitCmd');
    await super.run();

    const confPath = fileUtil.getConfigPath();

    if (FS.existsSync(confPath)) {
      const msg = 'A docapi-config.json file already exists. Would you like to overwrite it? (y/n)';
      const input = await askInput('input', msg);
      devLog('>>> InitCmd', console);
      if (!askUtil.isYesInput(input)) {
        return;
      }
    }

    let contents = `{
  "${configKeys.base_uri}": "",
  "${configKeys.src_path}": "${DEFAULT_SRC_PATH}"
}
`;

    try {
      FS.writeFileSync(confPath, contents, {encoding: 'utf-8'});
      console.log(`${confPath} created`);
    } catch (e) {
      conprint.error(`[Error creating config file:]`);
      console.error(e);
    }
  }
}
