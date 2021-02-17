"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const _util_1 = require("../../util/_util");
/**
 * Print to console.
 */
const conprint = {
    info: (msg) => {
        if (_util_1.yes(msg)) {
            console.log(chalk.blueBright(msg));
        }
    },
    error: (msg) => {
        if (typeof msg === 'string') {
            if (_util_1.yes(msg)) {
                console.log(chalk.red(msg));
            }
        }
        else {
            console.log(chalk.red(msg.message));
        }
    },
    notice: (msg) => {
        if (_util_1.yes(msg)) {
            console.log(chalk.yellow(msg));
        }
    },
    success: (msg) => {
        if (_util_1.yes(msg)) {
            console.log(chalk.greenBright(msg));
        }
    },
    plain: (msg) => {
        if (_util_1.yes(msg)) {
            console.log(msg);
        }
    },
};
exports.default = conprint;
