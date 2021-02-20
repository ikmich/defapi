import { CMD_CONFIG, CMD_ENDPOINT, CMD_INIT_DEFS, CMD_UPDATE_DEFS } from './index';
import { EndpointCmd } from './EndpointCmd';
import { ConfigCmd } from './ConfigCmd';
import { GenerateDefsCmd } from './GenerateDefsCmd';
import { ICommandInfo } from '../index';
import { UpdateDefsCmd } from './UpdateDefsCmd';

const cmdDispatcher = {
  dispatch: async (commandInfo: ICommandInfo) => {
    let mainCommand = commandInfo.name;

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
      case CMD_ENDPOINT:
        await new EndpointCmd(commandInfo).run();
        break;

      case CMD_CONFIG:
        await new ConfigCmd(commandInfo).run();
        break;

      case CMD_INIT_DEFS:
        await new GenerateDefsCmd(commandInfo).run();
        break;

      case CMD_UPDATE_DEFS:
        await new UpdateDefsCmd(commandInfo).run();
        break;

      default:
        //const cliCommand = await getCmdArgsString();
        break;
    }
  }
};

export default cmdDispatcher;
