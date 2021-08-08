// import { Request, Response } from 'express';
// import { getRawEndpoints } from '../index';
// import { filterDefs } from '../../common/defs';
// import { generateManifest } from '../../common/impl/generateManifest';
// import configManager from '../../common/managers/configManager';
// import { yes } from '../../common/util';
// import { PATH_HTML_CLIENT_FILE, PATH_HTML_CLIENT_MANIFESTS_DIR } from '../../common';
// import fileManager from '../../common/managers/fileManager';
// import { FS, Path } from '../../common/depds';
// import { DefapiError } from '../../common/errors';
//
// async function viewClientController(req: Request, res: Response) {
//   return new Promise((resolve, reject) => {
//     const config = configManager.getConfig();
//     const host = `${req.protocol}://${req.get('Host') ?? 'http://localhost'}`;
//     const baseUri = <string>config.api.baseUri || host;
//     let rawDefs = filterDefs(<string>req.query.search, getRawEndpoints(req.app));
//
//     const manifest = generateManifest(rawDefs, baseUri);
//
//     const manifestTag = configManager.getTitle().toLowerCase().replace(/\s+/g, '_');
//     if (PATH_HTML_CLIENT_MANIFESTS_DIR == null) {
//       throw new DefapiError('client manifests dir path not set');
//     }
//     FS.ensureDirSync(PATH_HTML_CLIENT_MANIFESTS_DIR);
//
//     try {
//       const manifestFilepath = Path.join(PATH_HTML_CLIENT_MANIFESTS_DIR, `${manifestTag}.json`);
//       fileManager.write(manifestFilepath, JSON.stringify(manifest, null, 2));
//       //fileManager.write(PATH_HTML_CLIENT_REPOSITORY, JSON.stringify(manifest, null, 2));
//     } catch (e) {
//       console.error('[defapi.ERR] Error writing api def to client repository');
//       throw e;
//     }
//
//     res.sendFile(PATH_HTML_CLIENT_FILE, null, (err: Error) => {
//       if (err) {
//         res.status(500);
//         console.error(`[defapi.err] Error serving html client`, err);
//         return reject(err);
//       }
//
//       setTimeout(() => {
//         resolve(200);
//       }, 200);
//     });
//   });
// }
//
// // export { viewClientController };
