import { ICommandInfo, ICommandOptions } from '../index';
import { Stringx } from '../../index';
export declare class BaseCmd {
    commandInfo: ICommandInfo;
    protected name: string;
    protected args: string[];
    protected options: ICommandOptions;
    constructor(commandInfo: ICommandInfo);
    getArg(position: number): Stringx;
    /**
     * Executes actions to run the command.
     */
    run(): Promise<void>;
    protected exec(cmd: string): Promise<string>;
}
export default BaseCmd;
