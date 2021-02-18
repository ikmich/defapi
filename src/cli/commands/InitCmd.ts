import BaseCmd from "./BaseCmd";
import configUtil from "../../util/config-util";
import { API_PATH_INIT } from "../../constants";
import _httpRequest from "../../helpers/_httpRequest";
import {no} from "../../util/_util";
import {DefapiError} from "../../errors";

/**
 * Command handler for the `defapi init` command.
 */
export class InitCmd extends BaseCmd {
  async run() {
    await super.run();

    const baseUri = configUtil.getPropBaseUri();
    if (no(baseUri)) {
      throw new DefapiError('No base uri');
    }

    try {
      const { res, raw } = await _httpRequest({
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
