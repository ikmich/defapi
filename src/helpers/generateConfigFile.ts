import askInput from "../cli/lib/ask/ask-input";
import { askUtil } from "../cli/cli-helpers/ask-util";
import { configKeys, DEFAULT_SRC_PATH } from "../constants";
import conprint from "../cli/cli-helpers/conprint";
import { DefapiConfig } from "../index";
import fileUtil from "../util/file-util";
import * as FS from "fs-extra";

export async function generateConfigFile(opts: DefapiConfig) {
  const configPath = fileUtil.getConfigPath();
  const configExists = FS.existsSync(configPath);
  if (configExists) {
    const msg =
      "An defapi-config.json file already exists. Would you like to overwrite it? (y/n)";
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
}
