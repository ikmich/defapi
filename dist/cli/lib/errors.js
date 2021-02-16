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
exports.NoMethodError = exports.NoPathError = exports.NoTitleError = void 0;
var NoTitleError = /** @class */ (function (_super) {
    __extends(NoTitleError, _super);
    function NoTitleError() {
        return _super.call(this, "Endpoint title not found") || this;
    }
    return NoTitleError;
}(Error));
exports.NoTitleError = NoTitleError;
var NoPathError = /** @class */ (function (_super) {
    __extends(NoPathError, _super);
    function NoPathError() {
        return _super.call(this, "Endpoint path not found") || this;
    }
    return NoPathError;
}(Error));
exports.NoPathError = NoPathError;
var NoMethodError = /** @class */ (function (_super) {
    __extends(NoMethodError, _super);
    function NoMethodError() {
        return _super.call(this, "Endpoint method not found") || this;
    }
    return NoMethodError;
}(Error));
exports.NoMethodError = NoMethodError;
