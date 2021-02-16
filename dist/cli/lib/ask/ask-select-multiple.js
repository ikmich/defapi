"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_select_1 = __importDefault(require("./ask-select"));
const askSelectMultiple = async (name = 'choice', message = 'Select choice', choices) => {
    return await ask_select_1.default(name, message, choices, true);
};
exports.default = askSelectMultiple;
