"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var _util_1 = require("../../util/_util");
var generateManifest_1 = require("../../helpers/generateManifest");
function generateManifestRequestHandler(req, res) {
    try {
        var baseUri = req.app.get(constants_1.SETTING_BASE_URI);
        var srcPath = req.app.get(constants_1.SETTING_SRC_PATH);
        // const baseDir = process.cwd();
        var responseData = {};
        // ----
        var mergedDefs = generateManifest_1.generateManifest({
            baseUri: baseUri,
            srcPath: srcPath,
        }, req.app).mergedDefs;
        responseData.mergedDefs = mergedDefs;
        return _util_1.httpSuccess(res, responseData);
    }
    catch (e) {
        return _util_1.httpFail(res, e);
    }
}
exports.default = generateManifestRequestHandler;
