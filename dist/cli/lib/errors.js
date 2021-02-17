"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoMethodError = exports.NoPathError = exports.NoTitleError = void 0;
class NoTitleError extends Error {
    constructor() {
        super("Endpoint title not found");
    }
}
exports.NoTitleError = NoTitleError;
class NoPathError extends Error {
    constructor() {
        super("Endpoint path not found");
    }
}
exports.NoPathError = NoPathError;
class NoMethodError extends Error {
    constructor() {
        super("Endpoint method not found");
    }
}
exports.NoMethodError = NoMethodError;
