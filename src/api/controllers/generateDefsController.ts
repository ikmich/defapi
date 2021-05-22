import { Express, Request, Response } from 'express';
import FS from 'fs-extra';
import { EndpointDef } from '../../types';
import { getEndpoints, httpFail, httpSuccess } from '../index';
import configUtil from '../../common/util/configUtil';
import _util, { _def, _defFilename, _defId, no, yes } from '../../common/util';
import { DEFAULT_SRC_PATH } from '../../common/constants';
import fileUtil from '../../common/util/fileUtil';
import { generateDefContents } from '../../common/helpers/generateDefContents';
import { Path } from '../../common/depds';

/**
 * Http request handler for generating or updating/refreshing endpoint def files.
 *
 * @param req
 * @param res
 * @param isUpdate
 */
function generateDefsController(req: Request, res: Response, isUpdate?: boolean) {
  try {
    let resData: any = {};

    const shouldResetDefs = ['true', '1', 'yes'].includes(<string>req.query.reset) || false;
    isUpdate = !shouldResetDefs;

    const srcPath = _util.fn(() => {
      const confVal = configUtil.getSrcPath();
      if (yes(confVal)) {
        return confVal;
      }

      return DEFAULT_SRC_PATH;
    });

    if (no(srcPath)) {
      return httpFail(res, `No srcPath set`, 400);
    }

    let defsDir = fileUtil.getDefsDir();
    let entries = FS.readdirSync(defsDir);
    resData['isEmptyDefsDir'] = !(Array.isArray(entries) && entries.length);

    let defs: EndpointDef[] = getEndpoints(req.app as Express);
    resData['count'] = defs.length;
    let MAP_DEF_CONTENTS: { [k: string]: string } = {};
    for (let def of defs) {
      def = _def(def);
      MAP_DEF_CONTENTS[_defId(def)] = generateDefContents(def, { shouldUpdate: isUpdate });
    }

    let message = `Endpoint def files created successfully`;

    defs.forEach((def) => {
      const filename = `${_defId(def)}.js`;
      const filepath = Path.join(defsDir, _defFilename(def));

      let content = MAP_DEF_CONTENTS[_defId(def)];
      FS.writeFileSync(filepath, content);
    });

    httpSuccess(res, resData, message);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default generateDefsController;
