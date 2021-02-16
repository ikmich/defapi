"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../config"));
var parseCliArgs = function (argv) {
    var _a;
    var commandInfo = {
        name: '',
        args: [],
        options: {},
    };
    var commands = argv._;
    commandInfo.name = (commands && commands.length > 0 ? commands[0] : '').trim();
    if (config_1.default.isDev()) {
        console.log({ name: commandInfo.name });
    }
    argv._.forEach(function (arg, idx) {
        if (idx > 0) {
            commandInfo.args.push(arg);
        }
    });
    if (config_1.default.isDev()) {
        console.log({ args: commandInfo.args });
    }
    for (var o in argv) {
        if (argv.hasOwnProperty(o) && o !== '_' && o !== '$0') {
            commandInfo.options = __assign(__assign({}, commandInfo.options), (_a = {}, _a[o] = argv[o], _a));
            //commandInfo.options[o] = argv[o];
        }
    }
    if (config_1.default.isDev()) {
        console.log({ options: commandInfo.options });
    }
    return commandInfo;
};
exports.default = parseCliArgs;
