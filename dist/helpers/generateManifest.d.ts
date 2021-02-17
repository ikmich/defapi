import { Application } from "express";
import { ApidefConfig, EndpointDef } from "../index";
declare function generateManifest(input: ApidefConfig, app: Application): {
    mergedDefs: EndpointDef[];
    manifestFile: string;
    contents: string;
};
export { generateManifest };
