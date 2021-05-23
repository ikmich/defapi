import { InitCommand } from './InitCommand';
import { GenerateDefsCommand } from './GenerateDefsCommand';
import {CMD_GENERATE_DEFS, CMD_INIT, ICommandInfo} from '../index';

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
      case CMD_INIT:
        await new InitCommand(commandInfo).run();
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
