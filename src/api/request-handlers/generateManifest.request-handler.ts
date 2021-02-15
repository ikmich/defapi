import { Request, Response } from "express";
import { SETTING_BASE_URI, SETTING_SRC_PATH } from "../../constants";
import { httpFail, httpSuccess } from "../../util/_util";
import { generateManifest } from "../../helpers/generateManifest";

function generateManifestRequestHandler(req: Request, res: Response) {
  try {
    const baseUri = req.app.get(SETTING_BASE_URI);
    const srcPath = req.app.get(SETTING_SRC_PATH);
    // const baseDir = process.cwd();
    const responseData: any = {};

    // ----

    let { mergedDefs } = generateManifest(
      {
        baseUri: baseUri,
        srcPath: srcPath,
      },
      req.app
    );
    responseData.mergedDefs = mergedDefs;

    return httpSuccess(res, responseData);
  } catch (e) {
    return httpFail(res, e);
  }
}

export default generateManifestRequestHandler;
