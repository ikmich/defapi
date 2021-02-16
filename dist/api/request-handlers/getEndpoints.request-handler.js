"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _util_1 = require("../../util/_util");
var get_endpoints_1 = require("../lib/get-endpoints");
function getEndpointsRequestHandler(req, res) {
    var endpoints = get_endpoints_1.getEndpoints(req.app);
    return _util_1.httpSuccess(res, {
        count: endpoints.length,
        endpoints: endpoints,
    });
}
exports.default = getEndpointsRequestHandler;
