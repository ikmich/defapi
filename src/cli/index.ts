#!/usr/bin/env node

import yargs from 'yargs';
import { CMD_CONFIG, CMD_GENERATE_DEFS } from './commands';
import parseCliArgs from './parse-cli-args';
import cmdDispatcher from './commands/cmd-dispatcher';
import { SendHandle, Serializable } from 'child_process';

const argv = yargs
  .command(CMD_CONFIG, 'Create defapi configuration json file')
  .command(CMD_GENERATE_DEFS, 'Generate/update endpoint definition files')
  .command('foo', 'Dummy command for test') // <<< todo - delete when done testing
  .help().argv;

const commandInfo = parseCliArgs(argv);

cmdDispatcher.dispatch(commandInfo).catch((err: any) => {
  console.error(err);
});

// ----

export interface ICommandOptions {
  path?: string;
  title?: string;
  method?: string;
  filename?: string;
  file?: string;
  ext?: 'js' | 'ts';
  baseUri?: string;
  srcPath?: string;
}

export interface ICommandInfo {
  name: string;
  args: string[];
  options: ICommandOptions;
}

export interface ISpawnCallbacks {
  stdout: (stream: Buffer, data: string) => void;
  stderr: (stream: Buffer, data: string) => void;
  error: (error: Error) => void;
  close: (code: number, signal: NodeJS.Signals) => void;
  exit?: (code: number, signal: NodeJS.Signals) => void;
  message?: (message: Serializable, sendHandle: SendHandle) => void;
}
