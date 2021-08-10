#!/usr/bin/env node

import yargs from 'yargs';
import parseCliArgs from './parse-cli-args';
import cmdDispatcher from './commands/cmd-dispatcher';

export const CMD_INIT = 'init';
export const CMD_GENERATE_DEFS = 'generate';

export interface ICommandOptions {}

export interface ICommandInfo {
  name: string;
  args: string[];
  options: ICommandOptions;
}

const argv = yargs
  .command(CMD_INIT, 'Create defapi configuration file and __defapi home dir')
  .command(CMD_GENERATE_DEFS, 'Generate/update endpoint definition files')
  .help().argv;

const commandInfo = parseCliArgs(argv);

cmdDispatcher.dispatch(commandInfo).catch((err: any) => {
  console.error(err);
});
