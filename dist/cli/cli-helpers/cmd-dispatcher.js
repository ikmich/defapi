"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_cmds_1 = require("../commands/cli-cmds");
const get_cmd_args_string_1 = __importDefault(require("./get-cmd-args-string"));
const EndpointCmd_1 = require("../commands/EndpointCmd");
const ConfigCmd_1 = require("../commands/ConfigCmd");
const InitCmd_1 = require("../commands/InitCmd");
const cmdDispatcher = {
    dispatch: async (commandInfo) => {
        let mainCommand = commandInfo.name;
        console.log({ mainCommand });
        // Protect from dangerous commands
        switch (true) {
            case /rm\s+/.test(mainCommand):
            case /rmdir\s+/.test(mainCommand):
            case /del\s+/.test(mainCommand):
            case /unlink\s+/.test(mainCommand):
            case /move\s+/.test(mainCommand):
            case /cp\s+/.test(mainCommand):
            case /copy\s+/.test(mainCommand):
                return;
        }
        switch (mainCommand) {
            case cli_cmds_1.CMD_ENDPOINT:
                await new EndpointCmd_1.EndpointCmd(commandInfo).run();
                break;
            case cli_cmds_1.CMD_CONFIG:
                await new ConfigCmd_1.ConfigCmd(commandInfo).run();
                break;
            case cli_cmds_1.CMD_INIT:
                await new InitCmd_1.InitCmd(commandInfo).run();
                break;
            default:
                const cliCommand = await get_cmd_args_string_1.default();
                if (cliCommand) {
                }
                else {
                    // console.log(chalk.red(`No such command: ${mainCommand}`));
                }
                break;
        }
    },
};
exports.default = cmdDispatcher;
