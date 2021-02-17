import { EndpointDef } from "../index";
/**
 * Generates a definition file for an endpoint.
 * @param def
 */
export default function generateDefFile(def: EndpointDef): {
    filepath: string;
    filename: string;
    contents: string;
};
