"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defapiRouter = void 0;
const express_1 = require("express");
const constants_1 = require("../constants");
const getEndpoints_request_handler_1 = __importDefault(require("./request-handlers/getEndpoints.request-handler"));
const initDefs_request_handler_1 = __importDefault(require("./request-handlers/initDefs.request-handler"));
const defapiRouter = express_1.Router();
exports.defapiRouter = defapiRouter;
defapiRouter.get(constants_1.API_PATH_ENDPOINTS, (req, res) => {
    return getEndpoints_request_handler_1.default(req, res);
});
defapiRouter.post(constants_1.API_PATH_MANIFEST, (req, res) => {
    //return generateManifestRequestHandler(req, res);
    res.status(501).json({
        message: "Not implemented",
    });
});
defapiRouter.post(constants_1.API_PATH_INIT, (req, res) => {
    return initDefs_request_handler_1.default(req, res);
});
defapiRouter.get(constants_1.API_PATH_ENDPOINTS_DL, (req, res) => {
    //return dlEndpointsRequestHandler(req, res);
    res.status(501).json({
        message: "Not implemented",
    });
});
