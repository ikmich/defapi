"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCmd = void 0;
const BaseCmd_1 = __importDefault(require("./BaseCmd"));
const conprint_1 = __importDefault(require("../../util/conprint"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const util_1 = require("../../util");
const generate_config_file_1 = require("../../util/generate-config-file");
const config_util_1 = __importDefault(require("../../util/config-util"));
const FS = require('fs-extra');
/**
 * Command handler for the `defapi config` command. Creates a defapi-config.json file
 */
class ConfigCmd extends BaseCmd_1.default {
    run() {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.run.call(this);
            const configPath = file_util_1.default.getConfigPath();
            const configExists = FS.existsSync(configPath);
            let opts = {
                baseUri: util_1._baseUri((_a = this.options.baseUri) !== null && _a !== void 0 ? _a : ''),
                srcPath: this.options.srcPath
            };
            if (configExists) {
                const config = config_util_1.default.getConfig();
                let isUpdate = false;
                if (util_1.yes(this.options.baseUri)) {
                    conprint_1.default.notice('Setting config.baseUri...');
                    isUpdate = true;
                    config.baseUri = opts.baseUri;
                }
                if (util_1.yes(opts.srcPath)) {
                    conprint_1.default.notice('Setting config.srcPath...');
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
                yield generate_config_file_1.generateConfigFile(opts);
            }
        });
    }
}
exports.ConfigCmd = ConfigCmd;
