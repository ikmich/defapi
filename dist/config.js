"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    isDev() {
        return process.env.NODE_ENV === 'development';
    },
};
exports.default = config;
