import { CMD_CONFIG, CMD_GENERATE_DEFS } from './index';
import { ConfigCommand } from './ConfigCommand';
import { GenerateDefsCommand } from './GenerateDefsCommand';
import { ICommandInfo } from '../index';

const cmdDispatcher = {
  dispatch: async (commandInfo: ICommandInfo) => {
    let mainCommand = commandInfo.name;

    // Protect from dangerous commands
    switch (true) {
      case /rm\s+/i.test(mainCommand):
      case /rmdir\s+/i.test(mainCommand):
      case /del\s+/i.test(mainCommand):
      case /unlink\s+/i.test(mainCommand):
      case /move\s+/i.test(mainCommand):
      case /cp\s+/i.test(mainCommand):
      case /copy\s+/i.test(mainCommand):
        return;
    }

    switch (mainCommand) {
      case CMD_CONFIG:
        await new ConfigCommand(commandInfo).run();
        break;

      case CMD_GENERATE_DEFS:
        await new GenerateDefsCommand(commandInfo).run();
        break;

      default:
        break;
    }
  }
};

export default cmdDispatcher;
