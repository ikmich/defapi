"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _util_1 = require("../../util/_util");
const get_endpoints_1 = require("../lib/get-endpoints");
function getEndpointsRequestHandler(req, res) {
    const endpoints = get_endpoints_1.getEndpoints(req.app);
    return _util_1.httpSuccess(res, {
        count: endpoints.length,
        endpoints,
    });
}
exports.default = getEndpointsRequestHandler;
