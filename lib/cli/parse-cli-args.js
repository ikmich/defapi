"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../_config"));
const parseCliArgs = (argv) => {
    let commandInfo = {
        name: '',
        args: [],
        options: {}
    };
    const commands = argv._;
    commandInfo.name = (commands && commands.length > 0 ? commands[0] : '').trim();
    if (_config_1.default.isDev()) {
        console.log({ name: commandInfo.name });
    }
    argv._.forEach((arg, idx) => {
        if (idx > 0) {
            commandInfo.args.push(arg);
        }
    });
    if (_config_1.default.isDev()) {
        console.log({ args: commandInfo.args });
    }
    for (let o in argv) {
        if (argv.hasOwnProperty(o) && o !== '_' && o !== '$0') {
            commandInfo.options = Object.assign(Object.assign({}, commandInfo.options), { [o]: argv[o] });
            //commandInfo.options[o] = argv[o];
        }
    }
    if (_config_1.default.isDev()) {
        console.log({ options: commandInfo.options });
    }
    return commandInfo;
};
exports.default = parseCliArgs;
