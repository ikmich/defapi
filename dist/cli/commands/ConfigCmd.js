"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCmd = void 0;
const BaseCmd_1 = __importDefault(require("./BaseCmd"));
const constants_1 = require("../../constants");
const conprint_1 = __importDefault(require("../cli-helpers/conprint"));
const ask_input_1 = __importDefault(require("../lib/ask/ask-input"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const ask_util_1 = require("../cli-helpers/ask-util");
const _util_1 = require("../../util/_util");
const FS = require("fs-extra");
/**
 * Command handler for the `apidef config` command. Creates a apidef-config.json file
 */
class ConfigCmd extends BaseCmd_1.default {
    async run() {
        var _a, _b;
        await super.run();
        const configPath = file_util_1.default.getConfigPath();
        const configExists = FS.existsSync(configPath);
        let opts = {
            baseUri: _util_1._baseUri((_a = this.options.baseUri) !== null && _a !== void 0 ? _a : ""),
            srcPath: (_b = this.options.srcPath) !== null && _b !== void 0 ? _b : "",
        };
        const fnCreateDefaultConfig = async () => {
            var _a;
            if (configExists) {
                const msg = "An apidef-config.json file already exists. Would you like to overwrite it? (y/n)";
                const input = await ask_input_1.default("input", msg);
                if (!ask_util_1.askUtil.isYesInput(input)) {
                    process.exit(0);
                    return;
                }
            }
            let contents = `
module.exports = {
  "${constants_1.configKeys.baseUri}": "${opts.baseUri}",
  "${constants_1.configKeys.srcPath}": "${(_a = opts.srcPath) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_SRC_PATH}"
}`;
            try {
                FS.writeFileSync(configPath, contents, { encoding: "utf-8" });
                console.log(`${configPath} created`);
            }
            catch (e) {
                conprint_1.default.error(`[Error creating config file:]`);
                console.error(e);
            }
        };
        if (configExists) {
            const config = require(configPath);
            let isUpdate = false;
            if (_util_1.yes(opts.baseUri)) {
                conprint_1.default.notice("Setting config.baseUri...");
                isUpdate = true;
                config.baseUri = opts.baseUri;
            }
            if (_util_1.yes(opts.srcPath)) {
                conprint_1.default.notice("Setting config.srcPath...");
                isUpdate = true;
                config.srcPath = opts.srcPath;
            }
            if (isUpdate) {
                // write new values back to file.
                const contents = `module.exports = ${JSON.stringify(config, null, 2)}`;
                FS.writeFileSync(configPath, contents);
            }
            conprint_1.default.info(JSON.stringify(config, null, 2));
        }
        else {
            // create default config
            await fnCreateDefaultConfig();
        }
    }
}
exports.ConfigCmd = ConfigCmd;
