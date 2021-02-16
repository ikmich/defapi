"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _util_1 = require("../util/_util");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function parseApidefBaseDir(dirPath, defs) {
    if (!defs)
        defs = [];
    var entries = fs_1.default.readdirSync(dirPath);
    var _loop_1 = function (entry) {
        if (entry === '.' || entry === '..') {
            return "continue";
        }
        var entrypath = path_1.default.resolve(dirPath, entry);
        var stat = fs_1.default.statSync(entrypath);
        if (stat.isDirectory()) {
            return { value: parseApidefBaseDir(entrypath, Array.from(defs)) };
        }
        else if (stat.isFile()) {
            var obs = [];
            var contentOb = void 0;
            try {
                contentOb = require(entrypath);
            }
            catch (e) {
                console.log("Error parsing " + entrypath);
                return { value: defs };
            }
            if (!contentOb) {
                return { value: defs };
            }
            if (contentOb.constructor == Object) {
                obs.push(contentOb);
            }
            else if (contentOb.constructor == Array) {
                obs = Array.from(contentOb);
            }
            // create mapper dict
            var dict_1 = {};
            for (var _i = 0, obs_1 = obs; _i < obs_1.length; _i++) {
                var ob = obs_1[_i];
                ob = _util_1._def(ob);
                var key = ob.method + " " + ob.path;
                dict_1[key] = ob;
            }
            return { value: defs.map(function (def) {
                    def = _util_1._def(def);
                    var key = def.method + " " + def.path;
                    var dictOb = dict_1[key];
                    if (!!dictOb) {
                        return __assign(__assign({}, def), dictOb);
                    }
                    return def;
                }) };
        }
    };
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        var state_1 = _loop_1(entry);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return defs;
}
exports.default = parseApidefBaseDir;
