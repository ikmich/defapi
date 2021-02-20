"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const generate_manifest_1 = require("../../util/generate-manifest");
function generateManifestController(req, res) {
    try {
        const baseUri = req.app.get(constants_1.SETTING_BASE_URI);
        const srcPath = req.app.get(constants_1.SETTING_SRC_PATH);
        // const baseDir = process.cwd();
        const responseData = {};
        // ----
        let { mergedDefs } = generate_manifest_1.generateManifest({
            baseUri: baseUri,
            srcPath: srcPath
        }, req.app);
        responseData.mergedDefs = mergedDefs;
        return util_1.httpSuccess(res, responseData);
    }
    catch (e) {
        return util_1.httpFail(res, e);
    }
}
exports.default = generateManifestController;
