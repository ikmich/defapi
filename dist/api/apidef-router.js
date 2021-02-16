"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apidefRouter = void 0;
var express_1 = require("express");
var constants_1 = require("../constants");
var getEndpoints_request_handler_1 = __importDefault(require("./request-handlers/getEndpoints.request-handler"));
var initDefs_request_handler_1 = __importDefault(require("./request-handlers/initDefs.request-handler"));
var apidefRouter = express_1.Router();
exports.apidefRouter = apidefRouter;
apidefRouter.get(constants_1.API_PATH_ENDPOINTS, function (req, res) {
    return getEndpoints_request_handler_1.default(req, res);
});
apidefRouter.post(constants_1.API_PATH_MANIFEST, function (req, res) {
    //return generateManifestRequestHandler(req, res);
    res.status(501).json({
        message: "Not implemented",
    });
});
apidefRouter.post(constants_1.API_PATH_INIT, function (req, res) {
    return initDefs_request_handler_1.default(req, res);
});
apidefRouter.get(constants_1.API_PATH_ENDPOINTS_DL, function (req, res) {
    //return dlEndpointsRequestHandler(req, res);
    res.status(501).json({
        message: "Not implemented",
    });
});
