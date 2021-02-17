import { ICommandInfo } from "../index";
declare const cmdDispatcher: {
    dispatch: (commandInfo: ICommandInfo) => Promise<void>;
};
export default cmdDispatcher;
