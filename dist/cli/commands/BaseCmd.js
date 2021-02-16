"use strict";
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
exports.BaseCmd = void 0;
const exec_shell_cmd_1 = __importDefault(require("../cli-helpers/exec-shell-cmd"));
const parse_error_1 = __importDefault(require("../cli-helpers/parse-error"));
class BaseCmd {
    constructor(commandInfo) {
        this.args = [];
        this.options = {};
        this.commandInfo = commandInfo;
        this.name = commandInfo.name;
        this.args = commandInfo.args;
        this.options = commandInfo.options;
    }
    getArg(position) {
        if (position < 1)
            position = 1;
        if (position > this.args.length)
            return null;
        return this.args[position - 1] || '';
    }
    /**
     * Executes actions to run the command.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    exec(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield exec_shell_cmd_1.default(cmd);
            }
            catch (e) {
                throw parse_error_1.default(e);
            }
        });
    }
}
exports.BaseCmd = BaseCmd;
exports.default = BaseCmd;
