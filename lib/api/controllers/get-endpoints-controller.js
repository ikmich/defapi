"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
const index_1 = require("../index");
function getEndpointsController(req, res) {
    const endpoints = index_1.getEndpoints(req.app);
    return util_1.httpSuccess(res, {
        count: endpoints.length,
        endpoints
    });
}
exports.default = getEndpointsController;
