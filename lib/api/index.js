"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpoints = void 0;
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const util_1 = require("../util");
const constants_1 = require("../constants");
function getEndpoints(app) {
    const endpoints = Array.from(express_list_endpoints_1.default(app));
    const defs = [];
    endpoints.forEach((endpoint) => {
        let isDefapiPath = /defapi\/?/.test(endpoint.path);
        if (!constants_1.excludedPaths.includes(endpoint.path) && !isDefapiPath) {
            endpoint.methods.forEach((method) => {
                let def = {
                    path: util_1._path(endpoint.path),
                    method: util_1._method(method)
                };
                defs.push(util_1._def(def));
            });
        }
    });
    return defs.map((def) => {
        def = util_1._def(def);
        return Object.assign(Object.assign({}, def), { title: def.path });
    });
}
exports.getEndpoints = getEndpoints;
