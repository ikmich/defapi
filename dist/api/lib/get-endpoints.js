"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpoints = void 0;
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const constants_1 = require("../../constants");
const _util_1 = require("../../util/_util");
function getEndpoints(app) {
    const endpoints = Array.from(express_list_endpoints_1.default(app));
    const defs = [];
    endpoints.forEach((endpoint) => {
        if (!constants_1.excludedPaths.includes(endpoint.path)) {
            endpoint.methods.forEach((method) => {
                let def = {
                    path: _util_1._path(endpoint.path),
                    method: _util_1._method(method)
                };
                defs.push(_util_1._def(def));
            });
        }
    });
    return defs.map((def) => {
        def = _util_1._def(def);
        return Object.assign(Object.assign({}, def), { title: def.path });
    });
}
exports.getEndpoints = getEndpoints;
