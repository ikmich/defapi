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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const EndpointCmd_1 = require("./EndpointCmd");
const ConfigCmd_1 = require("./ConfigCmd");
const GenerateDefsCmd_1 = require("./GenerateDefsCmd");
const UpdateDefsCmd_1 = require("./UpdateDefsCmd");
const cmdDispatcher = {
    dispatch: (commandInfo) => __awaiter(void 0, void 0, void 0, function* () {
        let mainCommand = commandInfo.name;
        // Protect from dangerous commands
        switch (true) {
            case /rm\s+/.test(mainCommand):
            case /rmdir\s+/.test(mainCommand):
            case /del\s+/.test(mainCommand):
            case /unlink\s+/.test(mainCommand):
            case /move\s+/.test(mainCommand):
            case /cp\s+/.test(mainCommand):
            case /copy\s+/.test(mainCommand):
                return;
        }
        switch (mainCommand) {
            case index_1.CMD_ENDPOINT:
                yield new EndpointCmd_1.EndpointCmd(commandInfo).run();
                break;
            case index_1.CMD_CONFIG:
                yield new ConfigCmd_1.ConfigCmd(commandInfo).run();
                break;
            case index_1.CMD_INIT_DEFS:
                yield new GenerateDefsCmd_1.GenerateDefsCmd(commandInfo).run();
                break;
            case index_1.CMD_UPDATE_DEFS:
                yield new UpdateDefsCmd_1.UpdateDefsCmd(commandInfo).run();
                break;
            default:
                //const cliCommand = await getCmdArgsString();
                break;
        }
    })
};
exports.default = cmdDispatcher;
