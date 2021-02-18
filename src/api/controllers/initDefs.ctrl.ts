import { Express, Request, Response } from "express";
import { DEFAULT_SRC_PATH } from "../../constants";
import _util, {
  _baseUri,
  _def,
  httpFail,
  httpSuccess,
  no,
  yes,
} from "../../util/_util";
import configUtil from "../../util/config-util";
import fileUtil from "../../util/file-util";
import FS from "fs-extra";
import { EndpointDef } from "../../index";
import { getEndpoints } from "../lib/get-endpoints";
import { generateDefFile } from "../../helpers/generateDefFile";

export type InitDefsResult = {
  error?: string | Error;
  message?: string;
};

function initDefsCtrl(req: Request, res: Response, isUpdate?: boolean) {
  try {
    let responseData: any = {};

    let config = {
      baseUri: _baseUri(
        _util.fn(() => {
          const confVal = configUtil.getPropBaseUri();
          if (yes(confVal)) {
            return confVal;
          }
          return "";
        })
      ),
      srcPath: _util.fn(() => {
        const confVal = configUtil.getPropSrcPath();
        if (yes(confVal)) {
          return confVal;
        }

        return DEFAULT_SRC_PATH;
      }),
    };

    if (no(config.baseUri)) {
      return httpFail(res, `No baseUri set`, 400);
    }

    if (no(config.srcPath)) {
      return httpFail(res, `No srcPath set`, 400);
    }

    let result: InitDefsResult = {};

    let defsDir = fileUtil.getDefsDir();
    let entries = FS.readdirSync(defsDir);
    let isEmptyDefsDir: boolean = !(Array.isArray(entries) && entries.length);

    // if (isEmptyDefsDir) {
    //   isUpdate = false;
    // }

    responseData = {
      ...responseData,
      isUpdate,
      isEmptyDefsDir,
    };

    if (no(isUpdate) && no(isEmptyDefsDir)) {
      result.message = `Endpoint defs dir is not empty. Consider updating instead.`;
      return httpFail(res, result.message, 400);
    }

    let defs: EndpointDef[] = getEndpoints(req.app as Express);
    for (let def of defs) {
      def = _def(def);
      // create endpoint def file
      generateDefFile(def, { isUpdate });
    }

    result.message = `Endpoint def files created successfully`;
    return httpSuccess(res, responseData, result.message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default initDefsCtrl;
