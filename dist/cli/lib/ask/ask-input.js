"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const askInput = async (name = 'input', message = 'Enter input') => {
    const result = await inquirer_1.default.prompt({
        type: 'input',
        name,
        message,
    });
    return result[name];
};
exports.default = askInput;
