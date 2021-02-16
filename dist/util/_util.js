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
exports._baseUri = exports.getDefFileStub = exports.devLog = exports._noSpace = exports._slug = exports._wait = exports.arrayContains = exports.isEmpty = exports._fn = exports.no = exports.yes = exports._def = exports._method = exports._path = exports.httpSuccess = exports.httpFail = exports.manifestUtil = void 0;
var errors_1 = require("../api/lib/errors");
var slugify_1 = __importDefault(require("slugify"));
var config_1 = __importDefault(require("../config"));
var manifestUtil = {
    hasEndpoints: function (manifest) {
        return Array.isArray(manifest.endpoints) && manifest.endpoints.length > 0;
    },
};
exports.manifestUtil = manifestUtil;
var httpSuccess = function (res, data, message) {
    var body = {
        status: "success",
    };
    if (data) {
        body.data = data;
    }
    if (message) {
        body.message = message;
    }
    res.status(200).json(body);
};
exports.httpSuccess = httpSuccess;
var httpFail = function (res, error, httpCode, data) {
    var body = {
        status: "fail",
        message: typeof error === "string" ? error : error.message,
    };
    if (data) {
        body.data = data;
    }
    if (error instanceof errors_1.HttpError) {
        httpCode = error.statusCode;
    }
    if (!httpCode) {
        httpCode = 500;
    }
    res.status(httpCode).json(body);
};
exports.httpFail = httpFail;
/**
 * Normalize path, remove trailing slash.
 * @param path
 */
function _path(path) {
    if (!path)
        return "";
    // remove duplicated slashes
    path = path.replace(/\/{2,}/g, "/");
    // remove trailing slash(es)
    path = path.replace(/\/+$/g, "");
    // ensure begins with slash
    path = path.replace(/^\/*/, "/");
    return path;
}
exports._path = _path;
function _baseUri(baseUri) {
    // Remove any trailing slashes in base uri
    return baseUri.replace(/\/+$/, "");
}
exports._baseUri = _baseUri;
function _method(method) {
    return method.toUpperCase();
}
exports._method = _method;
function _def(def) {
    return __assign(__assign({}, def), { path: _path(def.path), method: _method(def.method) });
}
exports._def = _def;
function getDefFileStub(def) {
    var pathStub = def.path.replace(/\//g, ">");
    pathStub = pathStub.replace(/:/g, "@");
    return def.method + ">" + pathStub;
}
exports.getDefFileStub = getDefFileStub;
// ----
function yes(o) {
    var b = o !== undefined && o !== null;
    if (b && typeof o === "string") {
        b = b && o !== "";
    }
    return b;
}
exports.yes = yes;
function no(o) {
    return !yes(o);
}
exports.no = no;
function arrayContains(haystack, needle) {
    return haystack.indexOf(needle) > -1;
}
exports.arrayContains = arrayContains;
function arrayContainsAnyOf(haystack, needles) {
    for (var _i = 0, haystack_1 = haystack; _i < haystack_1.length; _i++) {
        var item = haystack_1[_i];
        if (haystack.indexOf(item) > -1) {
            return true;
        }
    }
    return false;
}
function isEmpty(subject) {
    if (no(subject)) {
        return true;
    }
    switch (true) {
        case typeof subject === "string":
            return no(subject);
        case Array.isArray(subject):
            return subject.length === 0;
        case typeof subject === "object":
            return Object.keys(subject).length === 0;
        case typeof subject === "number":
            return subject === 0;
        default:
            return no(subject);
    }
}
exports.isEmpty = isEmpty;
function _fn(f) {
    if (f) {
        return f();
    }
}
exports._fn = _fn;
function _wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, ms);
    });
}
exports._wait = _wait;
function _slug(s) {
    return slugify_1.default(s, {
        lower: true,
        replacement: "-",
    });
}
exports._slug = _slug;
function _noSpace(s) {
    return s.replace(/\s+/g, "");
}
exports._noSpace = _noSpace;
function devLog(p1, _console) {
    if (!config_1.default.isDev()) {
        return;
    }
    var msg = null;
    var title = null;
    if (typeof p1 === "string") {
        msg = p1;
    }
    else if (typeof p1 === "object") {
        msg = p1;
    }
    console.log();
    var useConsole = _console ? _console : console;
    useConsole.log(msg);
}
exports.devLog = devLog;
var _util = {
    fn: function (f) {
        if (f) {
            return f();
        }
    },
};
exports.default = _util;
