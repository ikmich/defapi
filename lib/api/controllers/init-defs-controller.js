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
const constants_1 = require("../../constants");
const util_1 = __importStar(require("../../util"));
const config_util_1 = __importDefault(require("../../util/config-util"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const generate_endpoint_def_file_1 = require("../../util/generate-endpoint-def-file");
const commands_1 = require("../../cli/commands");
const index_1 = require("../index");
/**
 * Http request handler for generating or updating/refreshing endpoint def files.
 *
 * @param req
 * @param res
 * @param isUpdate
 */
function initDefsController(req, res, isUpdate) {
    try {
        let responseData = {
            logs: []
        };
        let config = {
            baseUri: util_1._baseUri(util_1.default.fn(() => {
                const confVal = config_util_1.default.getBaseUri();
                if (util_1.yes(confVal)) {
                    return confVal;
                }
                return '';
            })),
            srcPath: util_1.default.fn(() => {
                const confVal = config_util_1.default.getSrcPath();
                if (util_1.yes(confVal)) {
                    return confVal;
                }
                return constants_1.DEFAULT_SRC_PATH;
            })
        };
        if (util_1.no(config.baseUri)) {
            return util_1.httpFail(res, `No baseUri set`, 400);
        }
        if (util_1.no(config.srcPath)) {
            return util_1.httpFail(res, `No srcPath set`, 400);
        }
        let result = {};
        let defsDir = file_util_1.default.getDefsDir();
        let entries = fs_extra_1.default.readdirSync(defsDir);
        let isEmptyDefsDir = !(Array.isArray(entries) && entries.length);
        responseData = Object.assign(Object.assign({}, responseData), { isUpdate,
            isEmptyDefsDir });
        if (!isUpdate && !isEmptyDefsDir) {
            const msgBuilder = ['Endpoint defs dir is not empty. '];
            msgBuilder.push('Consider updating defs instead, ');
            msgBuilder.push(`by running "${commands_1.DEFAPI_COMMAND__UPDATE_DEFS}" in your terminal; `);
            msgBuilder.push(`or by making a POST request to "{baseUri}${constants_1.API_PATH_UPDATE_DEFS}".`);
            result.message = msgBuilder.join('');
            return util_1.httpFail(res, result.message, 400);
        }
        let defs = index_1.getEndpoints(req.app);
        for (let def of defs) {
            def = util_1._def(def);
            generate_endpoint_def_file_1.generateEndpointDefFile(def, { isUpdate });
        }
        result.message = `Endpoint def files created successfully`;
        return util_1.httpSuccess(res, responseData, result.message);
    }
    catch (e) {
        return util_1.httpFail(res, e);
    }
}
exports.default = initDefsController;
