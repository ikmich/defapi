"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 500; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = statusCode;
        _this.error = new Error(message);
        return _this;
    }
    HttpError.fromError = function (args) {
        if (!args.statusCode || args.statusCode === 0) {
            args.statusCode = 500;
        }
        var msg = '';
        if (args.what) {
            msg += '[' + args.what + '] ';
        }
        msg += args.error.message;
        var httpError = new HttpError(msg, args.statusCode);
        httpError.error = args.error;
        return httpError;
    };
    return HttpError;
}(Error));
exports.HttpError = HttpError;
