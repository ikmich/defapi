import { Request, Response } from 'express';
import { getEndpoints } from '../index';
import { filterDefs } from '../../common/defs';
import { generateManifest } from '../../common/impl/generateManifest';
import configManager from '../../common/managers/configManager';
import { yes } from '../../common/util';
import { PATH_HTML_CLIENT_FILE, PATH_HTML_CLIENT_REPOSITORY } from '../../common';
import fileManager from '../../common/managers/fileManager';

async function viewDocsController(req: Request, res: Response) {
  const config = configManager.getConfig();
  const host = `${req.protocol}://${req.get('Host') ?? 'http://localhost'}`;
  const baseUri = yes(config.api.baseUri) ? (config.api.baseUri as string) : host;
  let rawDefs = filterDefs(<string>req.query.search, getEndpoints(req.app));

  const manifest = generateManifest(rawDefs, baseUri);

  try {

    fileManager.write(PATH_HTML_CLIENT_REPOSITORY, JSON.stringify(manifest, null, 2));
  } catch (e) {
    console.error('[defapi.ERR] Error writing api def to api.json');
    throw e;
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).sendFile(PATH_HTML_CLIENT_FILE);
}

export { viewDocsController };
