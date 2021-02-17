#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const cli_cmds_1 = require("./commands/cli-cmds");
const parse_cli_args_1 = __importDefault(require("./cli-helpers/parse-cli-args"));
const cmd_dispatcher_1 = __importDefault(require("./cli-helpers/cmd-dispatcher"));
const argv = yargs_1.default
    .command(cli_cmds_1.CMD_ENDPOINT, "Create endpoint definition file")
    .command(cli_cmds_1.CMD_CONFIG, "Create defapi configuration json file")
    .help().argv;
const commandInfo = parse_cli_args_1.default(argv);
cmd_dispatcher_1.default.dispatch(commandInfo).catch(err => {
    console.error(err);
});
