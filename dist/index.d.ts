import { Express } from "express";
export declare type ObjectOrNull = object | null;
export declare type StringOrNull = string | null;
export declare type ArrayOrNull<T> = Array<T> | null;
export interface EndpointDef {
    path: string;
    method: string;
    title?: StringOrNull;
    description?: StringOrNull;
    request?: RequestDef;
    response?: ResponseDef;
    group?: StringOrNull;
}
export declare type TResponseBody = {
    [k in 'success' | 'ok' | 'fail' | 'error' | string]: object;
} | ObjectOrNull;
export declare type RequestTypeDef = StringOrNull;
export declare type TypeDef = {
    type: string;
    description: string;
    default: any;
} | StringOrNull;
export declare type ApiManifest = {
    baseUri: string;
    endpoints: Array<EndpointDef>;
};
export declare type RequestDef = {
    type?: StringOrNull;
    query?: ObjectOrNull;
    body?: ObjectOrNull;
    headers?: ObjectOrNull;
};
export declare type ResponseDef = {
    type?: StringOrNull;
    body?: TResponseBody;
};
/**
 * Interface definition for the defapi-config.json file
 */
export interface DefapiConfig {
    baseUri?: string;
    srcPath?: string;
}
/**
 * Register your express app instance with defapi routes.
 * @param app
 * @param opts If not provided, the values in defapi-config.json are used; otherwise, this parameter takes precedence.
 */
declare function register(app: Express, opts?: DefapiConfig): void;
declare const defapi: {
    register: typeof register;
};
export default defapi;
