import { ICommandInfo, ICommandOptions } from "../cli-meta";
import { StringOrNull } from "../../api/meta";
export declare class BaseCmd {
    commandInfo: ICommandInfo;
    protected name: string;
    protected args: string[];
    protected options: ICommandOptions;
    constructor(commandInfo: ICommandInfo);
    getArg(position: number): StringOrNull;
    /**
     * Executes actions to run the command.
     */
    run(): Promise<void>;
    protected exec(cmd: string): Promise<string>;
}
export default BaseCmd;
