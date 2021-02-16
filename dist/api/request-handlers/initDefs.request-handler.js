"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const _util_1 = require("../../util/_util");
const initDefs_1 = __importDefault(require("../helpers/initDefs"));
const config_util_1 = __importDefault(require("../../util/config-util"));
function initDefsRequestHandler(req, res) {
    var _a, _b, _c, _d;
    try {
        const responseData = {};
        let config = {
            baseUri: _util_1._baseUri((_b = (_a = config_util_1.default.getPropBaseUri()) !== null && _a !== void 0 ? _a : req.app.get(constants_1.SETTING_BASE_URI)) !== null && _b !== void 0 ? _b : ""),
            srcPath: (_d = (_c = config_util_1.default.getPropSrcPath()) !== null && _c !== void 0 ? _c : req.app.get(constants_1.SETTING_SRC_PATH)) !== null && _d !== void 0 ? _d : constants_1.DEFAULT_SRC_PATH,
        };
        const { message } = initDefs_1.default(req.app, config);
        return _util_1.httpSuccess(res, responseData, message);
    }
    catch (e) {
        return _util_1.httpFail(res, e);
    }
}
exports.default = initDefsRequestHandler;
