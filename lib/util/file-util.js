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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const config_util_1 = __importDefault(require("./config-util"));
const index_1 = __importStar(require("./index"));
const errors_1 = require("../errors");
const Path = require('path');
const FS = require('fs-extra');
const fileUtil = {
    getBaseDir() {
        return process.cwd();
    },
    getConfigPath() {
        const baseDir = process.cwd();
        return Path.resolve(baseDir, constants_1.CONFIG_FILENAME);
    },
    getSrcPath(conf) {
        let srcPath = index_1.default.fn(() => {
            if (conf && index_1.yes(conf.srcPath)) {
                return conf.srcPath;
            }
            if (index_1.yes(config_util_1.default.getSrcPath())) {
                return config_util_1.default.getSrcPath();
            }
            return constants_1.DEFAULT_SRC_PATH;
        });
        if (!FS.existsSync(srcPath))
            throw new errors_1.DefapiError('src path not found');
        return Path.resolve(this.getBaseDir(), srcPath);
    },
    getDefsDir(conf) {
        const srcPath = this.getSrcPath(conf);
        const defsDir = Path.resolve(srcPath, constants_1.DEFS_DIR_NAME);
        FS.ensureDirSync(defsDir);
        return defsDir;
    }
};
exports.default = fileUtil;
