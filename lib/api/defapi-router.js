"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defapiRouter = void 0;
const express_1 = require("express");
const constants_1 = require("../constants");
const get_endpoints_controller_1 = __importDefault(require("./controllers/get-endpoints-controller"));
const generate_defs_controller_1 = __importDefault(require("./controllers/generate-defs-controller"));
const defapiRouter = express_1.Router();
exports.defapiRouter = defapiRouter;
/**
 * Get list of registered endpoints
 */
defapiRouter.get(constants_1.API_PATH_ENDPOINTS, (req, res) => {
    return get_endpoints_controller_1.default(req, res);
});
// defapiRouter.post(API_PATH_MANIFEST, (req: Request, res: Response) => {
//   //return generateManifestController(req, res);
//   res.status(501).json({
//     message: "Not implemented",
//   });
// });
/**
 * Generate initial endpoint defs
 */
defapiRouter.post(constants_1.API_PATH_GENERATE_DEFS, (req, res) => {
    return generate_defs_controller_1.default(req, res, true);
});
