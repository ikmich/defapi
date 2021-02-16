"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class ManifestBuilder {
    constructor(manifest) {
        this.manifest = constants_1.emptyApiDef;
        if (manifest) {
            this.manifest = manifest;
        }
    }
    setBaseUri(uri) {
        this.manifest.baseUri = uri;
        return this;
    }
    add(endpoint) {
        this.manifest.endpoints.push(endpoint);
    }
    // public add(path: string, method: string, data?: RequestData, response?: NullableObject): ManifestBuilder {
    //   let endpoint: IEndpoint = {
    //     path,
    //     method
    //   };
    //
    //   if (data) {
    //     if (data.body) {
    //       endpoint = {
    //         ...endpoint,
    //         body: data.body
    //       };
    //     }
    //
    //     if (data.query) {
    //       endpoint = {
    //         ...endpoint,
    //         query: data.query
    //       }
    //     }
    //   }
    //
    //   this.manifest.endpoints.push(endpoint);
    //   return this;
    // }
    build() {
        return this.manifest;
    }
}
exports.default = ManifestBuilder;
