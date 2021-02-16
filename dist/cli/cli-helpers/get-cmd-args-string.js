"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the arguments passed to the cli command for the calling context.
 */
var getCmdArgsString = function () {
    var command = '';
    process.argv.forEach(function (entry, i) {
        if (i > 1) {
            command += entry + ' ';
        }
    });
    return command.replace(/\s+$/, '');
};
exports.default = getCmdArgsString;
