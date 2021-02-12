import { Express, Request, Response } from "express";
import {
  DEFAULT_SRC_PATH,
  SETTING_BASE_URI,
  SETTING_SRC_PATH,
} from "../../constants";
import { httpFail, httpSuccess } from "../../util/_util";
import initDefs from "../../helpers/initDefs";
import configUtil from "../../util/config-util";

function initDefsRequestHandler(req: Request, res: Response) {
  try {
    const responseData: any = {};

    let config = {
      baseUri:
        configUtil.getPropBaseUri() ?? req.app.get(SETTING_BASE_URI) ?? "",
      srcPath:
        configUtil.getPropSrcPath() ??
        req.app.get(SETTING_SRC_PATH) ??
        DEFAULT_SRC_PATH,
    };

    const initDefsResult = initDefs(req.app as Express, config);

    console.log({ initDefsResult });

    return httpSuccess(res, responseData);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default initDefsRequestHandler;
