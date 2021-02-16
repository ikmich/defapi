"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _util_1 = require("./_util");
var constants_1 = require("../constants");
var fs_1 = __importDefault(require("fs"));
var Path = require("path");
var defaultConfig = {
    baseUri: '',
    srcPath: constants_1.DEFAULT_SRC_PATH
};
var configUtil = {
    getConfig: function () {
        try {
            var baseDir = process.cwd();
            var configPath = Path.resolve(baseDir, constants_1.CONFIG_FILENAME);
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
    getPropSrcPath: function () {
        var config = this.getConfig();
        if (_util_1.yes(config.srcPath)) {
            return config.srcPath.replace(/^\/+/, '');
        }
        return constants_1.DEFAULT_SRC_PATH;
    },
    getPropBaseUri: function () {
        var config = this.getConfig();
        if (_util_1.yes(config.baseUri))
            return config.baseUri;
        return '';
    }
};
exports.default = configUtil;
