"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const _util_1 = require("../../util/_util");
const generateManifest_1 = require("../../helpers/generateManifest");
function generateManifestRequestHandler(req, res) {
    try {
        const baseUri = req.app.get(constants_1.SETTING_BASE_URI);
        const srcPath = req.app.get(constants_1.SETTING_SRC_PATH);
        // const baseDir = process.cwd();
        const responseData = {};
        // ----
        let { mergedDefs } = generateManifest_1.generateManifest({
            baseUri: baseUri,
            srcPath: srcPath,
        }, req.app);
        responseData.mergedDefs = mergedDefs;
        return _util_1.httpSuccess(res, responseData);
    }
    catch (e) {
        return _util_1.httpFail(res, e);
    }
}
exports.default = generateManifestRequestHandler;
