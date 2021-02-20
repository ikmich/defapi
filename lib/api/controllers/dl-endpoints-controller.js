"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function dlEndpointsController(req, res) {
    const endpoints = index_1.getEndpoints(req.app);
    const json = JSON.stringify(endpoints, null, 2);
    const filename = 'defapi-endpoints.json';
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(Buffer.from(json));
}
exports.default = dlEndpointsController;
