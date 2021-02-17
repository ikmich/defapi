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
exports.InitCmd = void 0;
const BaseCmd_1 = __importDefault(require("./BaseCmd"));
const config_util_1 = __importDefault(require("../../util/config-util"));
const constants_1 = require("../../constants");
const _request_1 = __importDefault(require("../../helpers/_request"));
/**
 * Command handler for the `apidef init` command.
 */
class InitCmd extends BaseCmd_1.default {
    run() {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.run.call(this);
            const baseUri = config_util_1.default.getPropBaseUri();
            try {
                const { res, raw } = yield _request_1.default({
                    baseUri,
                    method: "POST",
                    path: constants_1.API_PATH_INIT,
                });
                if (res.statusCode === 200) {
                    const resBody = JSON.parse(raw);
                    console.log(resBody);
                }
                else {
                    console.error(res.statusMessage);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.InitCmd = InitCmd;