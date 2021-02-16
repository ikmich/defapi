"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var _util_1 = require("../../util/_util");
/**
 * Print to console.
 */
var conprint = {
    info: function (msg) {
        if (_util_1.yes(msg)) {
            console.log(chalk.blueBright(msg));
        }
    },
    error: function (msg) {
        if (typeof msg === 'string') {
            if (_util_1.yes(msg)) {
                console.log(chalk.red(msg));
            }
        }
        else {
            console.log(chalk.red(msg.message));
        }
    },
    notice: function (msg) {
        if (_util_1.yes(msg)) {
            console.log(chalk.yellow(msg));
        }
    },
    success: function (msg) {
        if (_util_1.yes(msg)) {
            console.log(chalk.greenBright(msg));
        }
    },
    plain: function (msg) {
        if (_util_1.yes(msg)) {
            console.log(msg);
        }
    },
};
exports.default = conprint;
