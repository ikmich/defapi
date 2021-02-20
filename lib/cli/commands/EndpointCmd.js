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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointCmd = void 0;
const BaseCmd_1 = require("./BaseCmd");
const util_1 = __importStar(require("../../util"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const file_util_1 = __importDefault(require("../../util/file-util"));
const conprint_1 = __importDefault(require("../../util/conprint"));
const ask_input_1 = __importDefault(require("../ask/ask-input"));
const ask_1 = require("../ask");
const generate_endpoint_def_file_1 = require("../../util/generate-endpoint-def-file");
const errors_1 = require("../../errors");
/**
 * Command handler class for the `defapi endpoint` command.
 */
class EndpointCmd extends BaseCmd_1.BaseCmd {
    run() {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.run.call(this);
            let method = null;
            let path = null;
            if (this.args.length >= 2) {
                method = this.getArg(1);
                path = this.getArg(2);
            }
            if (util_1.yes(this.options.method)) {
                method = this.options.method;
            }
            if (util_1.yes(this.options.path)) {
                path = this.options.path;
            }
            if (util_1.no(method) || !method) {
                throw new errors_1.NoMethodError();
            }
            if (util_1.no(path) || !path) {
                throw new errors_1.NoPathError();
            }
            let title = util_1.default.fn(() => {
                let opt = this.options.title;
                if (util_1.yes(opt))
                    return opt;
                return `${method.toUpperCase()} ${path}`;
            });
            const def = {
                path,
                title,
                method
            };
            let defsDir = file_util_1.default.getDefsDir();
            const filename = `${util_1.getDefFileTitle(def)}.js`;
            const filepath = path_1.default.resolve(defsDir, filename);
            try {
                if (fs_extra_1.default.existsSync(filepath)) {
                    const msg = `File: "${filename}", already exists. Would you like to overwrite it? (y/n)`;
                    const input = yield ask_input_1.default('input', msg);
                    if (!ask_1.askUtil.isYesInput(input)) {
                        conprint_1.default.plain('Ignoring...');
                        return;
                    }
                }
                generate_endpoint_def_file_1.generateEndpointDefFile(def);
            }
            catch (e) {
                console.error(e);
            }
            if (fs_extra_1.default.existsSync(filepath)) {
                conprint_1.default.success(`${filename}`);
            }
        });
    }
}
exports.EndpointCmd = EndpointCmd;
