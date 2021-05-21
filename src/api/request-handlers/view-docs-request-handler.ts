import {Request, Response} from "express";
import Fs from 'fs-extra';
import Path from 'path';
import FS from "fs-extra";
import fileUtil from "../../common/util/file-util";

function viewDocsRequestHandler(req: Request, res: Response) {
  let defsDir = fileUtil.getDefsDir();
  let entries = FS.readdirSync(defsDir);
  let isEmptyDefsDir: boolean = !(Array.isArray(entries) && entries.length);

  // Todo - continue - read def files to render html docs
}

export {
  viewDocsRequestHandler
}
