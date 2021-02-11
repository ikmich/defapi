import {cmd_endpoint, cmd_init} from "../../cli-cmds";
import getCmdArgsString from "./get-cmd-args-string";
import {ICommandInfo} from "../../cli-meta";
import {EndpointCmd} from "../commands/EndpointCmd";
import {InitCmd} from "../commands/InitCmd";

const cmdDispatcher = {
  dispatch: async (commandInfo: ICommandInfo) => {
    let mainCommand = commandInfo.name;
    console.log({mainCommand});

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
      case cmd_endpoint:
        await new EndpointCmd(commandInfo).run();
        break;

      case cmd_init:
        await new InitCmd(commandInfo).run();
        break;

      default:
        const cliCommand = await getCmdArgsString();

        if (cliCommand) {

        } else {
          // console.log(chalk.red(`No such command: ${mainCommand}`));
        }

        break;
    }
  },
};

export default cmdDispatcher;
