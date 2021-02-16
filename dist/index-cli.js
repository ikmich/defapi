#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var cli_cmds_1 = require("./cli/commands/cli-cmds");
var parse_cli_args_1 = __importDefault(require("./cli/cli-helpers/parse-cli-args"));
var cmd_dispatcher_1 = __importDefault(require("./cli/cli-helpers/cmd-dispatcher"));
var argv = yargs_1.default
    .command(cli_cmds_1.CMD_ENDPOINT, 'Create endpoint definition file')
    .command(cli_cmds_1.CMD_CONFIG, 'Create apidef configuration json file')
    .help().argv;
var commandInfo = parse_cli_args_1.default(argv);
cmd_dispatcher_1.default.dispatch(commandInfo).catch(function (err) {
    console.error(err);
});
