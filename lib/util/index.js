"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._baseUri = exports.getDefFileTitle = exports._noSpace = exports._slug = exports._wait = exports.arrayContains = exports.isEmpty = exports.no = exports.yes = exports._def = exports._method = exports._path = exports.httpSuccess = exports.httpFail = void 0;
const errors_1 = require("../errors");
const slugify_1 = __importDefault(require("slugify"));
const httpSuccess = (res, data, message) => {
    let body = {
        status: 'success'
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
const httpFail = (res, error, httpCode, data) => {
    let body = {
        status: 'fail',
        message: typeof error === 'string' ? error : error.message
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
        return '';
    // remove duplicated slashes
    path = path.replace(/\/{2,}/g, '/');
    // remove trailing slash(es)
    path = path.replace(/\/+$/g, '');
    // ensure begins with slash
    path = path.replace(/^\/*/, '/');
    return path;
}
exports._path = _path;
function _baseUri(baseUri) {
    // Remove any trailing slashes in base uri
    return baseUri.replace(/\/+$/, '');
}
exports._baseUri = _baseUri;
function _method(method) {
    return method.toUpperCase();
}
exports._method = _method;
function _def(def) {
    return Object.assign(Object.assign({}, def), { path: _path(def.path), method: _method(def.method) });
}
exports._def = _def;
function getDefFileTitle(def) {
    let pathStub = def.path.replace(/\//g, '>');
    pathStub = pathStub.replace(/:/g, '@');
    return `${def.method}>${pathStub}`;
}
exports.getDefFileTitle = getDefFileTitle;
// ----
function yes(o) {
    if (typeof 0 === 'boolean') {
        return o;
    }
    let b = o !== undefined && o !== null;
    if (b && typeof o === 'string') {
        b = b && o !== '';
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
    for (let item of haystack) {
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
        case typeof subject === 'string':
            return no(subject);
        case Array.isArray(subject):
            return subject.length === 0;
        case typeof subject === 'object':
            return Object.keys(subject).length === 0;
        case typeof subject === 'number':
            return subject === 0;
        default:
            return no(subject);
    }
}
exports.isEmpty = isEmpty;
function _wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
}
exports._wait = _wait;
function _slug(s) {
    return slugify_1.default(s, {
        lower: true,
        replacement: '-'
    });
}
exports._slug = _slug;
function _noSpace(s) {
    return s.replace(/\s+/g, '');
}
exports._noSpace = _noSpace;
const ut = {
    fn(f) {
        if (f) {
            return f();
        }
    }
};
exports.default = ut;
