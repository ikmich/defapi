"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTitleError = exports.NoPathError = exports.NoMethodError = exports.DefapiError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(error, statusCode = 500) {
        var _a;
        super(typeof error === 'string' ? error : (_a = error.message) !== null && _a !== void 0 ? _a : '');
        this.statusCode = statusCode;
        this.error = new Error(typeof error === 'string' ? error : error.message);
    }
    static fromError(args) {
        if (!args.statusCode || args.statusCode === 0) {
            args.statusCode = 500;
        }
        let msg = '';
        if (args.what) {
            msg += '[' + args.what + '] ';
        }
        msg += args.error.message;
        let httpError = new HttpError(msg, args.statusCode);
        httpError.error = args.error;
        return httpError;
    }
}
exports.HttpError = HttpError;
class DefapiError extends Error {
    constructor(message) {
        super(`[defapi] ${message}`);
    }
}
exports.DefapiError = DefapiError;
class NoTitleError extends Error {
    constructor() {
        super('Endpoint title not found');
    }
}
exports.NoTitleError = NoTitleError;
class NoPathError extends Error {
    constructor() {
        super('Endpoint path not found');
    }
}
exports.NoPathError = NoPathError;
class NoMethodError extends Error {
    constructor() {
        super('Endpoint method not found');
    }
}
exports.NoMethodError = NoMethodError;
