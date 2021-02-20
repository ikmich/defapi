"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateConfigFile = void 0;
const ask_input_1 = __importDefault(require("../cli/ask/ask-input"));
const ask_1 = require("../cli/ask");
const constants_1 = require("../constants");
const conprint_1 = __importDefault(require("./conprint"));
const file_util_1 = __importDefault(require("./file-util"));
const FS = __importStar(require("fs-extra"));
function generateConfigFile(config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const configPath = file_util_1.default.getConfigPath();
        const configExists = FS.existsSync(configPath);
        if (configExists) {
            const msg = `A ${constants_1.CONFIG_FILENAME} file already exists. Would you like to overwrite it? (y/n)`;
            const input = yield ask_input_1.default('input', msg);
            if (!ask_1.askUtil.isYesInput(input)) {
                process.exit(0);
                return;
            }
        }
        let contents = `
module.exports = {
  "${constants_1.configKeys.baseUri}": "${config.baseUri}",
  "${constants_1.configKeys.srcPath}": "${(_a = config.srcPath) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_SRC_PATH}"
}`;
        try {
            FS.writeFileSync(configPath, contents, { encoding: 'utf-8' });
            console.log(`${configPath} created`);
        }
        catch (e) {
            conprint_1.default.error(`[Error creating config file:]`);
            console.error(e);
        }
    });
}
exports.generateConfigFile = generateConfigFile;
