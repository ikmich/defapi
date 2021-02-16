"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var config_util_1 = __importDefault(require("./config-util"));
var Path = require('path');
var FS = require('fs-extra');
var fileUtil = {
    getBaseDir: function () {
        return process.cwd();
    },
    getConfigPath: function () {
        var baseDir = process.cwd();
        return Path.resolve(baseDir, constants_1.CONFIG_FILENAME);
    },
    getSrcPath: function () {
        var srcPath = config_util_1.default.getPropSrcPath();
        if (!FS.existsSync(srcPath))
            throw new Error('src path not found');
        return Path.resolve(this.getBaseDir(), srcPath);
    },
    getDefsDir: function () {
        var srcPath = this.getSrcPath();
        var defsDir = Path.resolve(srcPath, constants_1.DEFS_DIR_NAME);
        FS.ensureDirSync(defsDir);
        return defsDir;
    }
};
exports.default = fileUtil;
