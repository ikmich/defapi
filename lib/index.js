"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const defapi_router_1 = require("./api/defapi-router");
const file_util_1 = __importDefault(require("./util/file-util"));
const FS = __importStar(require("fs-extra"));
const errors_1 = require("./errors");
// ---- ---- ---- ---- ----
/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function register(app) {
    const configPath = file_util_1.default.getConfigPath();
    if (!FS.existsSync(configPath)) {
        throw new errors_1.DefapiError(`${constants_1.CONFIG_FILENAME} file not found. Run \`defapi config\` from your project root to create a config file.`);
    }
    app.use(defapi_router_1.defapiRouter);
}
const defapi = {
    register
};
exports.default = defapi;
