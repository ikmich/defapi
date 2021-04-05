import execShellCmd from '../exec-shell-cmd';
import parseError from '../parse-error';
import { ICommandInfo, ICommandOptions } from '../index';
import { Stringx } from '../../index';

export class BaseCommand {
  public commandInfo: ICommandInfo;
  protected name: string;
  protected args: string[] = [];
  protected options: ICommandOptions = {};

  constructor(commandInfo: ICommandInfo) {
    this.commandInfo = commandInfo;
    this.name = commandInfo.name;
    this.args = commandInfo.args;
    this.options = commandInfo.options;
  }

  getArg(position: number): Stringx {
    if (position < 1) position = 1;
    if (position > this.args.length) return null;
    return this.args[position - 1] || '';
  }

  /**
   * Executes actions to run the command.
   */
  async run() {}

  protected async exec(cmd: string): Promise<string> {
    try {
      return await execShellCmd(cmd);
    } catch (e) {
      throw parseError(e);
    }
  }
}

export default BaseCommand;
