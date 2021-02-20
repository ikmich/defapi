import { EndpointDef } from '../index';
export declare type TGenDefFileMeta = {
    isUpdate?: boolean;
};
/**
 * Generates a definition file for an endpoint.
 * @param {EndpointDef} def
 * @param meta
 */
export declare function generateEndpointDefFile(def: EndpointDef, meta?: TGenDefFileMeta): {
    filepath: string;
    filename: string;
    contents: string;
};
