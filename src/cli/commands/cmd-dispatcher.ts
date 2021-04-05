import { CMD_CONFIG, CMD_GENERATE_DEFS } from './index';
import { ConfigCommand } from './ConfigCommand';
import { GenerateDefsCommand } from './GenerateDefsCommand';
import { ICommandInfo } from '../index';
import FooCommand from './FooCommand';

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
      case 'foo': // Todo - Remove after testing
        await new FooCommand(commandInfo).run();
        break;

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
