import { Express, Request, Response } from 'express';
import { DEFAULT_SRC_PATH } from '../../constants';
import ut, { _baseUri, _def, httpFail, httpSuccess, no, yes } from '../../util';
import configUtil from '../../util/config-util';
import fileUtil from '../../util/file-util';
import FS from 'fs-extra';
import { EndpointDef } from '../../index';
import { generateEndpointDefFile } from '../../util/generate-endpoint-def-file';
import { getEndpoints } from '../index';

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
function generateDefsController(req: Request, res: Response, isUpdate?: boolean) {
  try {
    let responseData: any = {
      logs: []
    };

    let config = {
      // baseUri: _baseUri(
      //   ut.fn(() => {
      //     const confVal = configUtil.getBaseUri();
      //     if (yes(confVal)) {
      //       return confVal;
      //     }
      //     return '';
      //   })
      // ),
      srcPath: ut.fn(() => {
        const confVal = configUtil.getSrcPath();
        if (yes(confVal)) {
          return confVal;
        }

        return DEFAULT_SRC_PATH;
      })
    };

    // if (no(config.baseUri)) {
    //   return httpFail(res, `No baseUri set`, 400);
    // }

    if (no(config.srcPath)) {
      return httpFail(res, `No srcPath set`, 400);
    }

    let result: InitDefsResult = {};

    let defsDir = fileUtil.getDefsDir();
    let entries = FS.readdirSync(defsDir);
    let isEmptyDefsDir: boolean = !(Array.isArray(entries) && entries.length);

    responseData = {
      ...responseData,
      isUpdate,
      isEmptyDefsDir
    };

    // if (!isUpdate && !isEmptyDefsDir) {
    //   const msgBuilder = ['Endpoint defs dir is not empty. '];
    //   msgBuilder.push('Consider updating defs instead, ');
    //   msgBuilder.push(`by running "${DEFAPI_COMMAND__UPDATE_DEFS}" in your terminal; `);
    //   msgBuilder.push(`or by making a POST request to "{baseUri}${API_PATH_UPDATE_DEFS}".`);
    //   result.message = msgBuilder.join('');
    //   return httpFail(res, result.message, 400);
    // }

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

export default generateDefsController;
