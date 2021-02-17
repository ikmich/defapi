import { ICommandInfo } from "../cli-meta";
declare const cmdDispatcher: {
    dispatch: (commandInfo: ICommandInfo) => Promise<void>;
};
export default cmdDispatcher;
