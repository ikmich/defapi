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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointCmd = void 0;
var BaseCmd_1 = require("./BaseCmd");
var _util_1 = __importStar(require("../../util/_util"));
var errors_1 = require("../lib/errors");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var file_util_1 = __importDefault(require("../../util/file-util"));
var conprint_1 = __importDefault(require("../cli-helpers/conprint"));
var ask_input_1 = __importDefault(require("../lib/ask/ask-input"));
var ask_util_1 = require("../cli-helpers/ask-util");
var generateDefFile_1 = __importDefault(require("../../helpers/generateDefFile"));
/**
 * Command handler class for the `apidef endpoint` command.
 */
var EndpointCmd = /** @class */ (function (_super) {
    __extends(EndpointCmd, _super);
    function EndpointCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndpointCmd.prototype.run = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var method, path, title, def, defsDir, filename, filepath, msg, input, e_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _c.sent();
                        method = null;
                        path = null;
                        if (this.args.length >= 2) {
                            method = this.getArg(1);
                            path = this.getArg(2);
                        }
                        if (_util_1.yes(this.options.method)) {
                            method = (_a = this.options.method) !== null && _a !== void 0 ? _a : null;
                        }
                        if (_util_1.yes(this.options.path)) {
                            path = (_b = this.options.path) !== null && _b !== void 0 ? _b : null;
                        }
                        if (_util_1.no(method)) {
                            throw new errors_1.NoMethodError();
                        }
                        if (_util_1.no(path)) {
                            throw new errors_1.NoPathError();
                        }
                        title = _util_1.default.fn(function () {
                            var opt = _this.options.title;
                            if (_util_1.yes(opt))
                                return opt;
                            return method.toUpperCase() + " " + path;
                        });
                        if (!path) {
                            throw new errors_1.NoPathError();
                        }
                        if (!method) {
                            throw new errors_1.NoMethodError();
                        }
                        def = {
                            path: path,
                            title: title,
                            method: method,
                        };
                        defsDir = file_util_1.default.getDefsDir();
                        filename = _util_1.getDefFileStub(def) + ".js";
                        filepath = path_1.default.resolve(defsDir, filename);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        if (!fs_extra_1.default.existsSync(filepath)) return [3 /*break*/, 4];
                        msg = "File: \"" + filename + "\", already exists. Would you like to overwrite it? (y/n)";
                        return [4 /*yield*/, ask_input_1.default("input", msg)];
                    case 3:
                        input = _c.sent();
                        if (!ask_util_1.askUtil.isYesInput(input)) {
                            conprint_1.default.plain("Ignoring...");
                            return [2 /*return*/];
                        }
                        _c.label = 4;
                    case 4:
                        generateDefFile_1.default(def);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        if (fs_extra_1.default.existsSync(filepath)) {
                            conprint_1.default.success("" + filename);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return EndpointCmd;
}(BaseCmd_1.BaseCmd));
exports.EndpointCmd = EndpointCmd;
