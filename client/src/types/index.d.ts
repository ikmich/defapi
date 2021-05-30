export interface EndpointDef {
    path: string;
    method: string;
    title?: Stringx;
    description?: Stringx;
    contentType?: Stringx;
    queryParams?: TQueryParamsDef;
    bodyParams?: TBodyParamsDef;
    headers?: Objectx;
    response?: ResponseDef;
}
export declare type Objectx = object | null | undefined;
export declare type Stringx = string | null | undefined;
export declare type Arrayx<T> = Array<T> | null | undefined;
export declare type CompositeTypeDef = {
    type?: string;
    description?: string;
    defaultValue?: any;
    options?: any[];
};
export declare type TypeDef = CompositeTypeDef | Stringx;
export declare type TQueryParamsDef = {
    [k: string]: TypeDef;
};
export declare type TBodyParamsDef = {
    [k: string]: TypeDef;
};
export declare type TResponseBodyDef = {
    [k: string]: TResponseBody;
} | TResponseBody | null;
export declare type TResponseBody = {
    [k: string]: TypeDef;
} | null;
export declare type ResponseDef = {
    type?: Stringx;
    body?: TResponseBodyDef;
    headers?: Objectx;
    [k: string]: any;
};
export declare type BaseUriDef = string | (() => string);
export interface DefapiConfig {
    api: {
        baseUri?: BaseUriDef;
        title?: string;
        defaultHeaders?: Objectx | (() => Objectx);
    };
    project: {
        srcPath?: string;
    };
    defapi: {
        routePrefix?: string;
    };
}
