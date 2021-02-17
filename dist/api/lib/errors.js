"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = new Error(message);
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
