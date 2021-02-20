import _config from '../_config';
import { ICommandInfo } from './index';

const parseCliArgs = (argv: any): ICommandInfo => {
  let commandInfo: ICommandInfo = {
    name: '',
    args: [],
    options: {}
  };

  const commands = argv._;
  commandInfo.name = (commands && commands.length > 0 ? commands[0] : '').trim();

  if (_config.isDev()) {
    console.log({ name: commandInfo.name });
  }

  argv._.forEach((arg: string, idx: number) => {
    if (idx > 0) {
      commandInfo.args.push(arg);
    }
  });

  if (_config.isDev()) {
    console.log({ args: commandInfo.args });
  }

  for (let o in argv) {
    if (argv.hasOwnProperty(o) && o !== '_' && o !== '$0') {
      commandInfo.options = {
        ...commandInfo.options,
        [o]: argv[o]
      };
      //commandInfo.options[o] = argv[o];
    }
  }

  if (_config.isDev()) {
    console.log({ options: commandInfo.options });
  }

  return commandInfo;
};

export default parseCliArgs;
