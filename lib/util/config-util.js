"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const constants_1 = require("../constants");
const fs_1 = __importDefault(require("fs"));
const Path = require('path');
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
            const config = require(configPath);
            if (typeof config.baseUri === 'function') {
                config.baseUri = config.baseUri();
            }
            if (!config.baseUri) {
                config.baseUri = '';
            }
            return config;
        }
        catch (e) {
            console.error(e);
            return defaultConfig;
        }
    },
    getSrcPath() {
        const config = this.getConfig();
        if (index_1.yes(config.srcPath)) {
            return config.srcPath.replace(/^\/+/, '');
        }
        return constants_1.DEFAULT_SRC_PATH;
    },
    getBaseUri() {
        const config = this.getConfig();
        if (config.baseUri) {
            if (typeof config.baseUri === 'string') {
                return config.baseUri;
            }
            if (typeof config.baseUri === 'function') {
                return config.baseUri();
            }
        }
        return '';
    },
    getTitle() {
        var _a;
        const config = this.getConfig();
        return (_a = config.title) !== null && _a !== void 0 ? _a : '';
    },
    getHeaders() {
        const config = this.getConfig();
        if (typeof config.headers === 'function') {
            return config.headers();
        }
        else {
            return config.headers;
        }
    }
};
exports.default = configUtil;
