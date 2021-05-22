import { Request, Response, Router } from 'express';
import { API_PATH_DOCS, API_PATH_ENDPOINTS, API_PATH_GENERATE_DEFS, DEFAPI_CONFIG_FILENAME } from '../common/constants';
import getEndpointsController from './controllers/getEndpointsController';
import generateDefsController from './controllers/generateDefsController';
import { FS, Path } from '../common/depds';
import { PATH_TO_COMMON_DIR } from '../common';

const defapiRouter = Router();

/*
 * Check for defapi-config.js in the project root.
 */
const projectRoot = process.cwd();
let originalDefapiConfigFilePath = Path.resolve(projectRoot, DEFAPI_CONFIG_FILENAME);
if (!FS.existsSync(originalDefapiConfigFilePath)) {
  console.warn(
    '`defapi-config.js` file not found in project root. Run `defapi config` to create the file, then restart your project server.'
  );
}

/*
 * Copy the file to the defapi project base, to prevent out-of-project import errors.
 */
const name = Path.basename(originalDefapiConfigFilePath);
const dest = Path.join(PATH_TO_COMMON_DIR, name);
try {
  FS.copyFileSync(originalDefapiConfigFilePath, dest);
} catch (e) {
  console.error('[defapi] Could not copy `defapi-config.js`', e);
}

if (!FS.existsSync(dest)) {
  console.warn('[defapi] Unable to process `defapi-config.js`');
}

/*
 * Route: Get list of registered express endpoints
 */
defapiRouter.get(API_PATH_ENDPOINTS, (req: Request, res: Response) => {
  return getEndpointsController(req, res);
});

/*
 * Route: Generate/update endpoint defs
 */
defapiRouter.post(API_PATH_GENERATE_DEFS, (req: Request, res: Response) => {
  return generateDefsController(req, res, true);
});

defapiRouter.get(API_PATH_DOCS, (req: Request, res: Response) => {});

export { defapiRouter };
