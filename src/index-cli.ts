#!/usr/bin/env node

import yargs from "yargs";
import {cmd_endpoint} from "./cli/cli-cmds";
import parseCliArgs from "./cli/lib/helpers/parse-cli-args";
import cmdDispatcher from "./cli/lib/helpers/cmd-dispatcher";

const argv = yargs
    .command(cmd_endpoint, 'Create endpoint definition file')
    .help().argv;

const commandInfo = parseCliArgs(argv);

cmdDispatcher.dispatch(commandInfo).catch(err => {
  console.error(err);
});
