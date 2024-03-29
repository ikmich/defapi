import { Request, Response } from 'express';
import { EndpointDef } from '../../types';
import { getRawEndpoints, httpFail, httpSuccess } from '../index';
import { yes } from '../../common/util';
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
    let responseData: any = {};

    const shouldResetDefs = ['true', '1', 'yes'].includes(<string>req.query.reset) || false;
    shouldUpdate = !shouldResetDefs;

    let defs: EndpointDef[] = getRawEndpoints(req.app);
    generateDefFiles(defs, { shouldUpdate });

    responseData['count'] = defs.length;
    let message = `Endpoint def files created`;
    httpSuccess(res, responseData, message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default generateDefsController;
