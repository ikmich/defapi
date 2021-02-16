#!/usr/bin/env node

import yargs from "yargs";
import {CMD_ENDPOINT, CMD_CONFIG} from "./cli/commands/cli-cmds";
import parseCliArgs from "./cli/cli-helpers/parse-cli-args";
import cmdDispatcher from "./cli/cli-helpers/cmd-dispatcher";

const argv = yargs
    .command(CMD_ENDPOINT, 'Create endpoint definition file')
    .command(CMD_CONFIG, 'Create apidef configuration json file')
    .help().argv;

const commandInfo = parseCliArgs(argv);

cmdDispatcher.dispatch(commandInfo).catch(err => {
  console.error(err);
});
