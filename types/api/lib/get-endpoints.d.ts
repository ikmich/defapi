import { Express } from "express";
import { EndpointDef } from "../meta";
declare function getEndpoints(app: Express): EndpointDef[];
export { getEndpoints };
