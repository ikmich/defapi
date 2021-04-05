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
const index_1 = require("./index");
const ConfigCommand_1 = require("./ConfigCommand");
const GenerateDefsCommand_1 = require("./GenerateDefsCommand");
const FooCommand_1 = __importDefault(require("./FooCommand"));
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
            case 'foo': // Todo - Remove after testing
                yield new FooCommand_1.default(commandInfo).run();
                break;
            case index_1.CMD_CONFIG:
                yield new ConfigCommand_1.ConfigCommand(commandInfo).run();
                break;
            case index_1.CMD_GENERATE_DEFS:
                yield new GenerateDefsCommand_1.GenerateDefsCommand(commandInfo).run();
                break;
            default:
                break;
        }
    })
};
exports.default = cmdDispatcher;
