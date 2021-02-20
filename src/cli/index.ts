#!/usr/bin/env node

import yargs from 'yargs';
import { CMD_CONFIG, CMD_ENDPOINT, CMD_INIT_DEFS, CMD_UPDATE_DEFS } from './commands';
import parseCliArgs from './parse-cli-args';
import cmdDispatcher from './commands/cmd-dispatcher';
import { SendHandle, Serializable } from 'child_process';

const argv = yargs
  .command(CMD_ENDPOINT, 'Create endpoint definition file')
  .command(CMD_CONFIG, 'Create defapi configuration json file')
  .command(CMD_INIT_DEFS, 'Generate initial endpoint definition files')
  .command(
    CMD_UPDATE_DEFS,
    'Update endpoint definition files to include endpoints added after the last time they were generated/updated'
  )
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
