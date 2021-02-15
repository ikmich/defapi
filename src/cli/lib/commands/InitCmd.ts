import BaseCmd from "./BaseCmd";
import configUtil from "../../../util/config-util";
import { API_PATH_INIT } from "../../../constants";
import _request from "../../../helpers/_request";

/**
 * Command handler for the `docapi init` command.
 */
export class InitCmd extends BaseCmd {
  async run() {
    await super.run();

    const baseUri = configUtil.getPropBaseUri();
    try {
      const { res, raw } = await _request({
        baseUri,
        method: "POST",
        path: API_PATH_INIT,
      });

      if (res.statusCode === 200) {
        const resBody = JSON.parse(raw);
        console.log(resBody);
      } else {
        console.error(res.statusMessage);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
