import { Express, Request, Response } from "express";
import { SETTING_BASE_URI, SETTING_SRC_PATH } from "../../constants";
import { httpFail, httpSuccess } from "../../util/_util";
import initDefs from "../../shared/lib/initDefs";
import configUtil from "../../util/config-util";

function initDefsRequestHandler(req: Request, res: Response) {
  try {
    const responseData: any = {};
    // ----
    const initDefsResult = initDefs(req.app as Express, {
      base_uri: configUtil.getPropBaseUri() ?? req.app.get(SETTING_BASE_URI),
      src_path: configUtil.getPropSrcPath() ?? req.app.get(SETTING_SRC_PATH),
    });

    console.log({ initDefsResult });

    return httpSuccess(res, responseData);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default initDefsRequestHandler;
