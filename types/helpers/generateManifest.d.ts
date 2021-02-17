import { ApidefConfig, EndpointDef } from "../api/meta";
import { Application } from "express";
declare function generateManifest(input: ApidefConfig, app: Application): {
    mergedDefs: EndpointDef[];
    manifestFile: string;
    contents: string;
};
export { generateManifest };
