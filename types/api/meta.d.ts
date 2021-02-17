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
    type?: RequestTypeDef;
    query?: ObjectOrNull;
    body?: ObjectOrNull;
    headers?: ObjectOrNull;
};
export declare type ResponseDef = {
    type?: StringOrNull;
    body?: TResponseBody;
};
/**
 * Interface definition for the apidef-config.json file
 */
export interface ApidefConfig {
    baseUri?: string;
    srcPath?: string;
}
