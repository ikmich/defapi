import { ApiManifest, EndpointDef } from "../api/meta";
import { Response } from "express";
import { HttpError } from "../api/lib/errors";
import slugify from "slugify";
import config from "../config";

const manifestUtil = {
  hasEndpoints(manifest: ApiManifest) {
    return Array.isArray(manifest.endpoints) && manifest.endpoints.length > 0;
  },
};

const httpSuccess = (res: Response, data?: any, message?: string) => {
  let body: any = {
    status: "success",
  };

  if (data) {
    body.data = data;
  }

  if (message) {
    body.message = message;
  }

  res.status(200).json(body);
};

const httpFail = (
  res: Response,
  error: string | Error | HttpError,
  httpCode?: number | null,
  data?: any
) => {
  let body: any = {
    status: "fail",
    message: typeof error === "string" ? error : error.message,
  };

  if (data) {
    body.data = data;
  }

  if (error instanceof HttpError) {
    httpCode = error.statusCode;
  }

  if (!httpCode) {
    httpCode = 500;
  }

  res.status(httpCode).json(body);
};

/**
 * Normalize path, remove trailing slash.
 * @param path
 */
function _path(path: string | null): string {
  if (!path) return "";
  // remove duplicated slashes
  path = path.replace(/\/{2,}/g, "/");

  // remove trailing slash(es)
  path = path.replace(/\/+$/g, "");

  // ensure begins with slash
  path = path.replace(/^\/*/, "/");

  return path;
}

function _baseUri(baseUri: string) {
  // Remove any trailing slashes in base uri
  return baseUri.replace(/\/+$/, "");
}

function _method(method: string): string {
  return method.toUpperCase();
}

function _def(def: EndpointDef): EndpointDef {
  return {
    ...def,
    path: _path(def.path),
    method: _method(def.method),
  };
}

function getDefFileStub(def: EndpointDef): string {
  let pathStub = def.path.replace(/\//g, ">");
  pathStub = pathStub.replace(/:/g, "@");
  return `${def.method}>${pathStub}`;
}

// ----

function yes(o: any) {
  let b = o !== undefined && o !== null;
  if (b && typeof o === "string") {
    b = b && o !== "";
  }

  return b;
}

function no(o: any) {
  return !yes(o);
}

function arrayContains(haystack: any[], needle: any): boolean {
  return haystack.indexOf(needle) > -1;
}

function arrayContainsAnyOf(haystack: any[], needles: any[]): boolean {
  for (let item of haystack) {
    if (haystack.indexOf(item) > -1) {
      return true;
    }
  }
  return false;
}

function isEmpty(subject: any): boolean {
  if (no(subject)) {
    return true;
  }

  switch (true) {
    case typeof subject === "string":
      return no(subject);
    case Array.isArray(subject):
      return subject.length === 0;
    case typeof subject === "object":
      return Object.keys(subject).length === 0;
    case typeof subject === "number":
      return subject === 0;
    default:
      return no(subject);
  }
}

function _fn(f?: () => any) {
  if (f) {
    return f();
  }
}

function _wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

function _slug(s: string) {
  return slugify(s, {
    lower: true,
    replacement: "-",
  });
}

function _noSpace(s: string) {
  return s.replace(/\s+/g, "");
}

export type DevLogParam =
  | {
      msg: any;
      title?: string | null;
    }
  | string;

function devLog(p1: DevLogParam, _console?: Console) {
  if (!config.isDev()) {
    return;
  }

  let msg = null;
  let title = null;
  if (typeof p1 === "string") {
    msg = p1;
  } else if (typeof p1 === "object") {
    msg = p1;
  }

  console.log();
  let useConsole = _console ? _console : console;

  useConsole.log(msg);
}

export {
  manifestUtil,
  httpFail,
  httpSuccess,
  _path,
  _method,
  _def,
  yes,
  no,
  _fn,
  isEmpty,
  arrayContains,
  _wait,
  _slug,
  _noSpace,
  devLog,
  getDefFileStub,
  _baseUri,
};

const _util = {
  fn(f?: () => any) {
    if (f) {
      return f();
    }
  },
};

export default _util;
