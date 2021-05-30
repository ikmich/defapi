import { Request, Response } from 'express';
import { EndpointDef } from '../../types';
import { getEndpoints, httpFail, httpSuccess } from '../index';
import configManager from '../../common/managers/configManager';
import { no, yes } from '../../common/util';
import { generateDefFiles } from '../../common/impl/generateDefFiles';

/**
 * Http request handler for generating or updating/refreshing endpoint def files.
 *
 * @param req
 * @param res
 * @param shouldUpdate
 */
function generateDefsController(req: Request, res: Response, shouldUpdate?: boolean) {
  try {
    let resData: any = {};

    const shouldResetDefs = ['true', '1', 'yes'].includes(<string>req.query.reset) || false;
    shouldUpdate = !shouldResetDefs;

    const srcPath = configManager.getSrcPath();
    if (no(srcPath)) {
      return httpFail(res, `No srcPath set`, 400);
    }

    let defs: EndpointDef[] = getEndpoints(req.app);
    generateDefFiles(defs, { shouldUpdate });

    resData['count'] = defs.length;
    let message = `Endpoint def files created`;
    httpSuccess(res, resData, message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default generateDefsController;
