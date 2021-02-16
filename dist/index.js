"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const apidef_router_1 = require("./api/apidef-router");
const config_util_1 = __importDefault(require("./util/config-util"));
const _util_1 = require("./util/_util");
/**
 * Register your express app instance with apidef routes.
 * @param app
 * @param opts If not provided, the values in apidef-config.json are used; otherwise, this parameter takes precedence.
 */
function register(app, opts) {
    var _a;
    if (opts && _util_1.yes(opts === null || opts === void 0 ? void 0 : opts.baseUri)) {
        app.set(constants_1.SETTING_BASE_URI, opts === null || opts === void 0 ? void 0 : opts.baseUri);
    }
    else {
        app.set(constants_1.SETTING_BASE_URI, config_util_1.default.getPropBaseUri());
    }
    if (opts && _util_1.yes(opts === null || opts === void 0 ? void 0 : opts.srcPath)) {
        app.set(constants_1.SETTING_SRC_PATH, (_a = opts === null || opts === void 0 ? void 0 : opts.srcPath) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_SRC_PATH);
    }
    else {
        app.set(constants_1.SETTING_SRC_PATH, config_util_1.default.getPropSrcPath());
    }
    app.use(apidef_router_1.apidefRouter);
}
const apidef = {
    register,
};
exports.default = apidef;
