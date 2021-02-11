export type ObjectOrNull = object | null;
export type StringOrNull = string | null;
export type ArrayOrNull<T> = Array<T> | null;

export interface EndpointDef {
  path: string;
  method: string;
  title?: StringOrNull;
  description?: StringOrNull;
  request?: RequestDef;
  response?: ResponseDef;
  group?: StringOrNull;
}

// export type ApiManifestEntry = IEndpointGroup | IEndpointDef;
export type DocapiOptions = {
  base_uri?: string;
  src_path?: string;
}

export type TResponseBody = {
  [k in 'success' | 'ok' | 'fail' | 'error' | string]: object;
} | ObjectOrNull;

export type RequestTypeDef = 'application/json' | 'multipart/form-data' | 'multipart/url-encoded' | 'text' | null;

export type TypeDef = {
  type: string;
  description: string;
  default: any;
} | StringOrNull;

export type ApiManifest = {
  baseUri: string;
  endpoints: Array<EndpointDef>
};

export type RequestDef = {
  type?: RequestTypeDef;
  query?: ObjectOrNull;
  body?: ObjectOrNull;
  headers?: ObjectOrNull;
  [k: string]: any;
};

export type ResponseDef = {
  type?: StringOrNull; // mime type
  body?: TResponseBody;
  [k: string]: any;
};

/**
 * Interface definition for the docapi-config.json file
 */
export interface DocapiConfig {
  base_uri?: string;
  src_path?: string;
}
