"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askUtil = void 0;
const askUtil = {
    isYesInput(value) {
        return value && value.length && (value === 'yes' || value === 'y' || value === '1');
    }
};
exports.askUtil = askUtil;
