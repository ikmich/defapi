"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMD_INIT = exports.CMD_CONFIG = exports.CMD_ENDPOINT = void 0;
/*
 # usage: apidef endpoint <title> <path> <method>
 # usage: apidef endpoint register-driver --path=<path> --method=<method>
 $ apidef endpoint register-driver --path='/registration' --method=POST
 */
exports.CMD_ENDPOINT = 'endpoint';
/*
 $ apidef config
 */
exports.CMD_CONFIG = 'config';
exports.CMD_INIT = 'init';
