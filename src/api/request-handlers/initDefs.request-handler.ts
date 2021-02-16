import { Express, Request, Response } from "express";
import {
  DEFAULT_SRC_PATH,
  SETTING_BASE_URI,
  SETTING_SRC_PATH,
} from "../../constants";
import { _baseUri, httpFail, httpSuccess } from "../../util/_util";
import initDefs from "../helpers/initDefs";
import configUtil from "../../util/config-util";

function initDefsRequestHandler(req: Request, res: Response) {
  try {
    const responseData: any = {};

    let config = {
      baseUri: _baseUri(
        configUtil.getPropBaseUri() ?? req.app.get(SETTING_BASE_URI) ?? ""
      ),
      srcPath:
        configUtil.getPropSrcPath() ??
        req.app.get(SETTING_SRC_PATH) ??
        DEFAULT_SRC_PATH,
    };

    const { message } = initDefs(req.app as Express, config);

    return httpSuccess(res, responseData, message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default initDefsRequestHandler;
