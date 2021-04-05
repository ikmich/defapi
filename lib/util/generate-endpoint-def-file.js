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
exports.generateEndpointDefFile = void 0;
const index_1 = __importStar(require("./index"));
const path_1 = __importDefault(require("path"));
const file_util_1 = __importDefault(require("./file-util"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const conprint_1 = __importDefault(require("./conprint"));
const config_util_1 = __importDefault(require("./config-util"));
/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param meta
 */
function generateEndpointDefFile(def, meta) {
    var _a;
    const { isUpdate } = meta !== null && meta !== void 0 ? meta : {};
    let defsDir = file_util_1.default.getDefsDir();
    const filename = `${index_1.getDefFileTitle(def)}.js`;
    const filepath = path_1.default.resolve(defsDir, filename);
    let defaultTitle = `${def.method} ${def.path}`;
    if (isUpdate) {
        if (fs_extra_1.default.existsSync(filepath)) {
            // Def file exists for this endpoint
            // Read file and create merged def
            try {
                const prevDef = require(filepath);
                if (prevDef) {
                    const mergedDef = Object.assign(Object.assign({}, prevDef), { method: def.method, path: def.path });
                    const openProps = ['path', 'method'];
                    Object.entries(def).forEach(([prop, val]) => {
                        if (openProps.includes(prop)) {
                            if (typeof val === typeof {}) {
                                if (index_1.yes(val)) {
                                    // @ts-ignore
                                    mergedDef[prop] = Object.assign(Object.assign({}, def[prop]), prevDef[prop]);
                                }
                            }
                            else {
                                if (index_1.yes(val)) {
                                    // @ts-ignore
                                    mergedDef[prop] = val;
                                }
                            }
                        }
                    });
                    def = Object.assign({}, mergedDef);
                }
            }
            catch (e) {
                conprint_1.default.error(e);
                throw e;
            }
        }
    } // todo - test update init
    let apiHeaders = config_util_1.default.getHeaders();
    let contents = `/**
 * @typedef {import('defapi').EndpointDef} EndpointDef
 * @type {EndpointDef}
 */
const def = {
  path: "${def.path}",
  method: "${def.method}",
  title: "${index_1.yes(def.title) ? def.title : defaultTitle}",
  description: "${(_a = def.description) !== null && _a !== void 0 ? _a : ''}",
  request: {
    /** Defaults to "application/json" if not set. */
    type: "",
    query: null,
    ${index_1.default.fn(() => {
        if (def.method.toUpperCase() !== 'GET' &&
            def.method.toUpperCase() !== 'OPTIONS' &&
            def.method.toUpperCase() !== 'HEAD') {
            return `body: {},`;
        }
        return '';
    })} ${index_1.default.fn(() => {
        if (apiHeaders) {
            return `headers: ${apiHeaders}`;
        }
        return '';
    })}
  },
  response: {
    /** Defaults to "application/json" if not set. */
    type: "",
    body: {}
  }
};
module.exports = def;`;
    try {
        fs_extra_1.default.writeFileSync(filepath, contents);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    return {
        filepath,
        filename,
        contents
    };
}
exports.generateEndpointDefFile = generateEndpointDefFile;
