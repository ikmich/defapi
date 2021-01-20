export type NullableObject = object | null;
export type NullableString = string | null;
export type NullableArray<T> = Array<T> | null;

export interface IEndpointGroup {
  title: string;
  endpoints: Array<EndpointDef>
}

export interface EndpointDef {
  path: string;
  method: string;
  title?: NullableString;
  tag?: NullableString;
  request?: RequestDef;
  response?: ResponseDef;
  group?: NullableString;
}

// export type ApiManifestEntry = IEndpointGroup | IEndpointDef;
export type DocapiOptions = {
  base_uri?: string;
  src_path?: string;
}

export type TResponseBody = {
  [k in 'success' | 'ok' | 'fail' | 'error' | string]: object;
} | NullableObject;

export type ApiManifest = {
  baseUri: string;
  endpoints: Array<EndpointDef>
};

export type RequestDef = {
  type?: NullableString;
  query?: NullableObject;
  body?: NullableObject;
  headers?: NullableObject;
  [k:string]: any;
};

export type ResponseDef = {
  type?: NullableString;
  body?: TResponseBody;
  [k:string]: any;
};

export interface DocapiConfig {
  base_uri?: string;
  src_path?: string;
}
