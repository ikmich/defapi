"use strict";
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
    async run() {
        await super.run();
        const baseUri = config_util_1.default.getPropBaseUri();
        try {
            const { res, raw } = await _request_1.default({
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
    }
}
exports.InitCmd = InitCmd;
