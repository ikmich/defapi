import { EndpointDef } from "../index";
/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param {boolean} update Whether to update an existing def file
 */
export default function generateDefFile(def: EndpointDef, update?: false): {
    filepath: string;
    filename: string;
    contents: string;
};
