"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const config_util_1 = __importDefault(require("./config-util"));
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
    getSrcPath() {
        let srcPath = config_util_1.default.getPropSrcPath();
        if (!FS.existsSync(srcPath))
            throw new Error('src path not found');
        return Path.resolve(this.getBaseDir(), srcPath);
    },
    getDefsDir() {
        const srcPath = this.getSrcPath();
        const defsDir = Path.resolve(srcPath, constants_1.DEFS_DIR_NAME);
        FS.ensureDirSync(defsDir);
        return defsDir;
    }
};
exports.default = fileUtil;
