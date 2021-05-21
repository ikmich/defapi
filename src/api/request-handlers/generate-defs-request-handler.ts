import { Express, Request, Response } from 'express';
import FS from 'fs-extra';
import { EndpointDef } from '../../index';
import { getEndpoints } from '../index';
import configUtil from "../../common/util/config-util";
import ut, {_def, httpFail, httpSuccess, no, yes} from "../../common/util";
import {DEFAULT_SRC_PATH} from "../../common/constants";
import fileUtil from "../../common/util/file-util";
import {generateEndpointDefFile} from "../../common/util/generate-endpoint-def-file";

export type InitDefsResult = {
  error?: string | Error;
  message?: string;
};

/**
 * Http request handler for generating or updating/refreshing endpoint def files.
 *
 * @param req
 * @param res
 * @param isUpdate
 */
function generateDefsRequestHandler(req: Request, res: Response, isUpdate?: boolean) {
  try {
    let responseData: any = {
      logs: []
    };

    const shouldResetDefs = ['true', '1'].includes(<string>req.query.reset) || false;
    if (shouldResetDefs) {
      isUpdate = false;
    }

    let config = {
      srcPath: ut.fn(() => {
        const confVal = configUtil.getSrcPath();
        if (yes(confVal)) {
          return confVal;
        }

        return DEFAULT_SRC_PATH;
      })
    };

    if (no(config.srcPath)) {
      return httpFail(res, `No srcPath set`, 400);
    }

    let result: InitDefsResult = {};

    let defsDir = fileUtil.getDefsDir();
    let entries = FS.readdirSync(defsDir);
    let isEmptyDefsDir: boolean = !(Array.isArray(entries) && entries.length);

    responseData = {
      ...responseData,
      isEmptyDefsDir
    };

    let defs: EndpointDef[] = getEndpoints(req.app as Express);
    for (let def of defs) {
      def = _def(def);
      generateEndpointDefFile(def, { isUpdate });
    }

    result.message = `Endpoint def files created successfully`;
    return httpSuccess(res, responseData, result.message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default generateDefsRequestHandler;
