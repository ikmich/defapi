import { Request, Response } from 'express';
import { getRawEndpoints, httpFail, httpSuccess } from '../index';
import { filterDefs } from '../../common/defs';
import configManager from '../../common/managers/configManager';
import { generateManifest } from '../../common/impl/generateManifest';

function getManifestController(req: Request, res: Response) {
  try {
    const config = configManager.getConfig();
    const host = `${req.protocol}://${req.get('Host') || 'http://localhost'}`;
    const baseUri = <string>config.api.baseUri || host;
    let rawDefs = filterDefs(<string>req.query.search, getRawEndpoints(req.app));

    const manifest = generateManifest(rawDefs, baseUri);
    httpSuccess(res, manifest);
  } catch (e) {
    httpFail(res, e);
  }
}

export default getManifestController;
