import { Request, Response } from 'express';
import fileUtil from '../../common/util/fileUtil';
import FS from 'fs-extra';

function getDefsJsonController(req: Request, res: Response) {
  let defsDir = fileUtil.getDefsDir();

  let entries = FS.readdirSync(defsDir);
  const isEmptyDir = !(Array.isArray(entries) && entries.length);

  // TODO - CONTINUE -- Download defs as json content type response
  if (isEmptyDir) {
    // Need to generate defs.
  }
}

export default getDefsJsonController;
