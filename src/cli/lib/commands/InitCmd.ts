import BaseCmd from "./BaseCmd";
import { FetchClient } from "fetchclient";
import configUtil from "../../../util/config-util";
import { API_PATH_INIT } from "../../../constants";

export class InitCmd extends BaseCmd {
  async run() {
    await super.run();

    const baseUri = configUtil.getPropBaseUri();

    const fc = new FetchClient({
      baseUri,
    });

    let res = await fc.post(API_PATH_INIT, {
      async responseHandler(response) {
        if (response.status >= 400) {
          throw new Error(`${response.statusText} - ${await response.text()}`);
        }
      },
    });

    let resBody = await fc.json(res);
    console.log({
      resBody,
    });
  }
}
