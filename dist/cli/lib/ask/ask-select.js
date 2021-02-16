"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const _util_1 = require("../../../util/_util");
const askSelect = async (name = 'choice', message = 'Select choice', choices, multiple = false) => {
    if (choices && choices.length > 0) {
        const result = await inquirer_1.default.prompt({
            type: _util_1.yes(multiple) ? 'checkbox' : 'list',
            name,
            message,
            choices,
        });
        return result[name] || '';
    }
    return '';
};
exports.default = askSelect;
