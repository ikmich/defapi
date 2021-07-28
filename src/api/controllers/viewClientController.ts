import { Request, Response } from 'express';
import { getRawEndpoints } from '../index';
import { filterDefs } from '../../common/defs';
import { generateManifest } from '../../common/impl/generateManifest';
import configManager from '../../common/managers/configManager';
import { yes } from '../../common/util';
import { PATH_HTML_CLIENT_FILE, PATH_HTML_CLIENT_REPOSITORY } from '../../common';
import fileManager from '../../common/managers/fileManager';

async function viewClientController(req: Request, res: Response) {
  return new Promise((resolve, reject) => {
    const config = configManager.getConfig();
    const host = `${req.protocol}://${req.get('Host') ?? 'http://localhost'}`;
    const baseUri = yes(config.api.baseUri) ? (config.api.baseUri as string) : host;
    let rawDefs = filterDefs(<string>req.query.search, getRawEndpoints(req.app));

    const manifest = generateManifest(rawDefs, baseUri);

    try {
      fileManager.write(PATH_HTML_CLIENT_REPOSITORY, JSON.stringify(manifest, null, 2));
    } catch (e) {
      console.error('[defapi.ERR] Error writing api def to client repository');
      throw e;
    }

    res.sendFile(PATH_HTML_CLIENT_FILE, null, (err: Error) => {
      if (err) {
        res.status(500);
        console.error(`[defapi.err] Error serving html client`, err);
        return reject(err);
      }

      setTimeout(() => {
        resolve(200);
      }, 200);
    });
  });
}

export { viewClientController };
