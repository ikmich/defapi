import {ApiManifest, EndpointDef, ObjectOrNull, RequestDef} from "../api/meta";
import {manifestUtil} from "../util/_util";
import docapi from "../index";
import {emptyApiDef} from "../constants";

class ManifestBuilder {
  private readonly manifest: ApiManifest = emptyApiDef;

  constructor(manifest?:ApiManifest) {
    if (manifest) {
      this.manifest = manifest;
    }
  }

  public setBaseUri(uri: string): ManifestBuilder {
    this.manifest.baseUri = uri;
    return this;
  }

  public add(endpoint:EndpointDef) {
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

  public build() {
    return this.manifest;
  }
}

export default ManifestBuilder;
