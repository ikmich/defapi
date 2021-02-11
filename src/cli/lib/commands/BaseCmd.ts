import {ICommandInfo, ICommandOptions} from "../../cli-meta";
import execShellCmd from "../helpers/exec-shell-cmd";
import parseError from "../helpers/parse-error";
import {StringOrNull} from "../../../api/meta";

export class BaseCmd {
  public commandInfo: ICommandInfo;
  protected name: string;
  protected args: string[] = [];
  protected options: ICommandOptions = {
  };

  constructor(commandInfo: ICommandInfo) {
    this.commandInfo = commandInfo;
    this.name = commandInfo.name;
    this.args = commandInfo.args;
    this.options = commandInfo.options;
  }

  getArg(position:number): StringOrNull {
    if (position < 1) position = 1;
    if (position > this.args.length) return null;
    return this.args[position - 1] || '';
  }

  /**
   * Executes actions to run the command.
   */
  async run() {

  }

  protected async exec(cmd: string): Promise<string> {
    try {
      return await execShellCmd(cmd);
    } catch (e) {
      throw parseError(e);
    }
  }
}

export default BaseCmd;
