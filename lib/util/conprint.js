"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const index_1 = require("./index");
/**
 * Print to console.
 */
const conprint = {
    info: (msg) => {
        if (index_1.yes(msg)) {
            console.log(chalk.blueBright(msg));
        }
    },
    error: (msg) => {
        if (typeof msg === 'string') {
            if (index_1.yes(msg)) {
                console.log(chalk.red(msg));
            }
        }
        else {
            console.log(chalk.red(msg.message));
        }
    },
    notice: (msg) => {
        if (index_1.yes(msg)) {
            console.log(chalk.yellow(msg));
        }
    },
    success: (msg) => {
        if (index_1.yes(msg)) {
            console.log(chalk.greenBright(msg));
        }
    },
    plain: (msg) => {
        if (index_1.yes(msg)) {
            console.log(msg);
        }
    }
};
exports.default = conprint;
