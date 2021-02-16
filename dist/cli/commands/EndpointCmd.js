"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointCmd = void 0;
const BaseCmd_1 = require("./BaseCmd");
const _util_1 = __importStar(require("../../util/_util"));
const errors_1 = require("../lib/errors");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const conprint_1 = __importDefault(require("../cli-helpers/conprint"));
const ask_input_1 = __importDefault(require("../lib/ask/ask-input"));
const ask_util_1 = require("../cli-helpers/ask-util");
const generateDefFile_1 = __importDefault(require("../../helpers/generateDefFile"));
/**
 * Command handler class for the `apidef endpoint` command.
 */
class EndpointCmd extends BaseCmd_1.BaseCmd {
    async run() {
        var _a, _b;
        await super.run();
        let method = null;
        let path = null;
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
        let title = _util_1.default.fn(() => {
            let opt = this.options.title;
            if (_util_1.yes(opt))
                return opt;
            return `${method.toUpperCase()} ${path}`;
        });
        if (!path) {
            throw new errors_1.NoPathError();
        }
        if (!method) {
            throw new errors_1.NoMethodError();
        }
        const def = {
            path,
            title,
            method,
        };
        let defsDir = file_util_1.default.getDefsDir();
        const filename = `${_util_1.getDefFileStub(def)}.js`;
        const filepath = path_1.default.resolve(defsDir, filename);
        try {
            if (fs_extra_1.default.existsSync(filepath)) {
                const msg = `File: "${filename}", already exists. Would you like to overwrite it? (y/n)`;
                const input = await ask_input_1.default("input", msg);
                if (!ask_util_1.askUtil.isYesInput(input)) {
                    conprint_1.default.plain("Ignoring...");
                    return;
                }
            }
            generateDefFile_1.default(def);
        }
        catch (e) {
            console.error(e);
        }
        if (fs_extra_1.default.existsSync(filepath)) {
            conprint_1.default.success(`${filename}`);
        }
    }
}
exports.EndpointCmd = EndpointCmd;
