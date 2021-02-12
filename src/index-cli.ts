#!/usr/bin/env node

import yargs from "yargs";
import {cmd_endpoint, cmd_config} from "./cli/cli-cmds";
import parseCliArgs from "./cli/lib/helpers/parse-cli-args";
import cmdDispatcher from "./cli/lib/helpers/cmd-dispatcher";

const argv = yargs
    .command(cmd_endpoint, 'Create endpoint definition file')
    .command(cmd_config, 'Create docapi configuration json file')
    .help().argv;

const commandInfo = parseCliArgs(argv);

cmdDispatcher.dispatch(commandInfo).catch(err => {
  console.error(err);
});
