import { Express } from 'express';
export declare type Objectx = object | null | undefined;
export declare type Stringx = string | null | undefined;
export declare type Arrayx<T> = Array<T> | null | undefined;
export interface EndpointDef {
    path: string;
    method: string;
    title?: Stringx;
    description?: Stringx;
    request?: RequestDef;
    response?: ResponseDef;
    group?: Stringx;
}
export declare type TResponseBodyDef = {
    [k: string]: TResponseBody;
} | TResponseBody | null;
export declare type TResponseBody = {
    [k: string]: TypeDef;
} | null;
export declare type TypeDef = {
    type: string;
    description?: string;
    defaultValue?: any;
    options?: any[];
} | Stringx;
export declare type ApiManifest = {
    baseUri: string;
    endpoints: Array<EndpointDef>;
};
export declare type RequestDef = {
    type?: Stringx;
    query?: Objectx;
    body?: Objectx;
    headers?: Objectx;
    [k: string]: any;
};
export declare type ResponseDef = {
    type?: Stringx;
    body?: TResponseBodyDef;
    headers?: Objectx;
    [k: string]: any;
};
export declare type BaseUriDef = string | (() => string);
export interface DefapiConfig {
    baseUri?: BaseUriDef;
    srcPath?: string;
    title?: string;
    headers?: Objectx | (() => Objectx);
}
/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
declare function register(app: Express): void;
declare const defapi: {
    register: typeof register;
};
export default defapi;
