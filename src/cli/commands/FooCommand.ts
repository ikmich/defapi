import BaseCommand from "./BaseCommand";
import configUtil from "../../util/config-util";

class FooCommand extends BaseCommand {
  async run() {
    await super.run();

    const config = configUtil.getConfig();
    console.log({config});
  }
}

export default FooCommand
