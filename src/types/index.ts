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

export type Objectx = object | null | undefined;
export type Stringx = string | null | undefined;
export type Arrayx<T> = Array<T> | null | undefined;

export type CompositeTypeDef = {
  type?: string;
  description?: string;
  defaultValue?: any;
  options?: any[];
};

export type TypeDef = CompositeTypeDef | Stringx;
export type TQueryParamsDef = {
  [k: string]: TypeDef;
};
export type TBodyParamsDef = {
  [k: string]: TypeDef;
};
export type TResponseBodyDef = { [k: string]: TResponseBody } | TResponseBody | null;
export type TResponseBody = {
  [k: string]: TypeDef;
} | null;
export type ResponseDef = {
  type?: Stringx;
  body?: TResponseBodyDef;
  headers?: Objectx;
  [k: string]: any;
};

export type BaseUriDef = string | (() => string);

export interface DefapiConfig {
  api: {
    baseUri?: string;
    title?: string;
    defaultHeaders?: Objectx | (() => object);
  };
  project: {
    srcPath?: string;
  };
  defapi: {
    routePrefix?: string;
  };
}

export interface Manifest {
  baseUri: string;
  title: string;
  defaultHeaders?: Objectx;
  defs: EndpointDef[];
}
