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
exports.ConfigCmd = void 0;
var BaseCmd_1 = __importDefault(require("./BaseCmd"));
var constants_1 = require("../../constants");
var conprint_1 = __importDefault(require("../cli-helpers/conprint"));
var ask_input_1 = __importDefault(require("../lib/ask/ask-input"));
var file_util_1 = __importDefault(require("../../util/file-util"));
var ask_util_1 = require("../cli-helpers/ask-util");
var _util_1 = require("../../util/_util");
var FS = require("fs-extra");
/**
 * Command handler for the `apidef config` command. Creates a apidef-config.json file
 */
var ConfigCmd = /** @class */ (function (_super) {
    __extends(ConfigCmd, _super);
    function ConfigCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigCmd.prototype.run = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var configPath, configExists, opts, fnCreateDefaultConfig, config, isUpdate, contents;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _c.sent();
                        configPath = file_util_1.default.getConfigPath();
                        configExists = FS.existsSync(configPath);
                        opts = {
                            baseUri: _util_1._baseUri((_a = this.options.baseUri) !== null && _a !== void 0 ? _a : ""),
                            srcPath: (_b = this.options.srcPath) !== null && _b !== void 0 ? _b : "",
                        };
                        fnCreateDefaultConfig = function () { return __awaiter(_this, void 0, void 0, function () {
                            var msg, input, contents;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!configExists) return [3 /*break*/, 2];
                                        msg = "An apidef-config.json file already exists. Would you like to overwrite it? (y/n)";
                                        return [4 /*yield*/, ask_input_1.default("input", msg)];
                                    case 1:
                                        input = _b.sent();
                                        if (!ask_util_1.askUtil.isYesInput(input)) {
                                            process.exit(0);
                                            return [2 /*return*/];
                                        }
                                        _b.label = 2;
                                    case 2:
                                        contents = "\nmodule.exports = {\n  \"" + constants_1.configKeys.baseUri + "\": \"" + opts.baseUri + "\",\n  \"" + constants_1.configKeys.srcPath + "\": \"" + ((_a = opts.srcPath) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_SRC_PATH) + "\"\n}";
                                        try {
                                            FS.writeFileSync(configPath, contents, { encoding: "utf-8" });
                                            console.log(configPath + " created");
                                        }
                                        catch (e) {
                                            conprint_1.default.error("[Error creating config file:]");
                                            console.error(e);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        if (!configExists) return [3 /*break*/, 2];
                        config = require(configPath);
                        isUpdate = false;
                        if (_util_1.yes(opts.baseUri)) {
                            conprint_1.default.notice("Setting config.baseUri...");
                            isUpdate = true;
                            config.baseUri = opts.baseUri;
                        }
                        if (_util_1.yes(opts.srcPath)) {
                            conprint_1.default.notice("Setting config.srcPath...");
                            isUpdate = true;
                            config.srcPath = opts.srcPath;
                        }
                        if (isUpdate) {
                            contents = "module.exports = " + JSON.stringify(config, null, 2);
                            FS.writeFileSync(configPath, contents);
                        }
                        conprint_1.default.info(JSON.stringify(config, null, 2));
                        return [3 /*break*/, 4];
                    case 2: 
                    // create default config
                    return [4 /*yield*/, fnCreateDefaultConfig()];
                    case 3:
                        // create default config
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ConfigCmd;
}(BaseCmd_1.default));
exports.ConfigCmd = ConfigCmd;
