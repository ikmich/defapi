"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askUtil = void 0;
var askUtil = {
    isYesInput: function (value) {
        return value && value.length
            && (value === 'yes' || value === 'y' || value === '1' || value === 'yep' || value === 'yup' || value === 'yeah');
    }
};
exports.askUtil = askUtil;
