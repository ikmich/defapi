import { Application } from "express";
import { DefapiConfig, EndpointDef } from "../index";
declare function generateManifest(input: DefapiConfig, app: Application): {
    mergedDefs: EndpointDef[];
    manifestFile: string;
    contents: string;
};
export { generateManifest };
