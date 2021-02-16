import { ApiManifest, EndpointDef } from "../api/meta";
declare class ManifestBuilder {
    private readonly manifest;
    constructor(manifest?: ApiManifest);
    setBaseUri(uri: string): ManifestBuilder;
    add(endpoint: EndpointDef): void;
    build(): ApiManifest;
}
export default ManifestBuilder;
