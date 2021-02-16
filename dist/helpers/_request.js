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
Object.defineProperty(exports, "__esModule", { value: true });
function _request(opts) {
    return new Promise(function (resolve, reject) {
        var http = require("http");
        var isHttps = opts.baseUri.startsWith("https://");
        if (isHttps) {
            http = require("https");
        }
        var noProtocol = opts.baseUri.replace(/^(http:\/\/|https:\/\/)/, "");
        var parts = noProtocol.split(":");
        var port;
        if (parts.length > 1) {
            port = parts[1];
        }
        else {
            port = undefined;
        }
        var hostname = parts[0];
        var options = {
            hostname: hostname,
            path: opts.path,
            method: opts.method.toUpperCase(),
            port: port,
            protocol: isHttps ? "https:" : "http:",
        };
        var req = http.request(options, function (res) {
            var raw = "";
            res.on("data", function (d) {
                raw += d;
            });
            res.on("end", function () {
                resolve({
                    res: res,
                    raw: raw,
                });
            });
        });
        req.on("error", function (error) {
            reject(error);
        });
        if (opts.jsonBody) {
            var data = JSON.stringify(opts.jsonBody);
            var defaultHeaders = {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            };
            if (!opts.headers) {
                opts.headers = defaultHeaders;
            }
            else if (!opts.headers["Content-Type"]) {
                opts.headers = __assign(__assign({}, opts.headers), defaultHeaders);
            }
            req.write(data);
        }
        req.end();
    });
}
exports.default = _request;
