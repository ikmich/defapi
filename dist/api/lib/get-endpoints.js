"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpoints = void 0;
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var constants_1 = require("../../constants");
var _util_1 = require("../../util/_util");
function getEndpoints(app) {
    var endpoints = Array.from(express_list_endpoints_1.default(app));
    var defs = [];
    endpoints.forEach(function (endpoint) {
        if (!constants_1.excludedPaths.includes(endpoint.path)) {
            endpoint.methods.forEach(function (method) {
                var def = {
                    path: _util_1._path(endpoint.path),
                    method: _util_1._method(method)
                };
                defs.push(_util_1._def(def));
            });
        }
    });
    return defs.map(function (def) {
        def = _util_1._def(def);
        return __assign(__assign({}, def), { title: def.path });
    });
}
exports.getEndpoints = getEndpoints;
