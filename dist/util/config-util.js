"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _util_1 = require("./_util");
const constants_1 = require("../constants");
const fs_1 = __importDefault(require("fs"));
const Path = require("path");
const defaultConfig = {
    baseUri: '',
    srcPath: constants_1.DEFAULT_SRC_PATH
};
const configUtil = {
    getConfig() {
        try {
            const baseDir = process.cwd();
            let configPath = Path.resolve(baseDir, constants_1.CONFIG_FILENAME);
            if (!fs_1.default.existsSync(configPath)) {
                return defaultConfig;
            }
            return require(configPath);
        }
        catch (e) {
            console.error(e);
            return defaultConfig;
        }
    },
    getPropSrcPath() {
        const config = this.getConfig();
        if (_util_1.yes(config.srcPath)) {
            return config.srcPath.replace(/^\/+/, '');
        }
        return constants_1.DEFAULT_SRC_PATH;
    },
    getPropBaseUri() {
        const config = this.getConfig();
        if (_util_1.yes(config.baseUri))
            return config.baseUri;
        return '';
    }
};
exports.default = configUtil;
