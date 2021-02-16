"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const execShellCmd = async (cmd) => {
    return new Promise((resolve, reject) => {
        child_process_1.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
        });
    });
};
exports.default = execShellCmd;
