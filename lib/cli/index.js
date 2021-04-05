#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const commands_1 = require("./commands");
const parse_cli_args_1 = __importDefault(require("./parse-cli-args"));
const cmd_dispatcher_1 = __importDefault(require("./commands/cmd-dispatcher"));
const argv = yargs_1.default
    .command(commands_1.CMD_CONFIG, 'Create defapi configuration json file')
    .command(commands_1.CMD_GENERATE_DEFS, 'Generate/update endpoint definition files')
    .command('foo', 'Dummy command for test') // <<< todo - delete when done testing
    .help().argv;
const commandInfo = parse_cli_args_1.default(argv);
cmd_dispatcher_1.default.dispatch(commandInfo).catch((err) => {
    console.error(err);
});
