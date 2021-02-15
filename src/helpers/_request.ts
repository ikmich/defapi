import { IncomingMessage } from "http";

export type TRequestOpts = {
  baseUri: string;
  path: string;
  method: string;
  jsonBody?: object;
  headers?: any;
};

export type TRequestResult = {
  res: IncomingMessage;
  raw: string;
};

export default function _request(opts: TRequestOpts): Promise<TRequestResult> {
  return new Promise((resolve, reject) => {
    let http = require("http");
    const isHttps = opts.baseUri.startsWith("https://");
    if (isHttps) {
      http = require("https");
    }

    const noProtocol = opts.baseUri.replace(/^(http:\/\/|https:\/\/)/, "");
    const parts = noProtocol.split(":");
    let port;
    if (parts.length > 1) {
      port = parts[1];
    } else {
      port = undefined;
    }

    const hostname = parts[0];
    const options = {
      hostname,
      path: opts.path,
      method: opts.method.toUpperCase(),
      port,
      protocol: isHttps ? "https:" : "http:",
    };

    const req = http.request(options, (res: IncomingMessage) => {
      let raw = "";

      res.on("data", (d) => {
        raw += d;
      });

      res.on("end", () => {
        resolve({
          res,
          raw,
        });
      });
    });

    req.on("error", (error: Error) => {
      reject(error);
    });

    if (opts.jsonBody) {
      const data = JSON.stringify(opts.jsonBody);

      const defaultHeaders = {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      };
      if (!opts.headers) {
        opts.headers = defaultHeaders;
      } else if (!opts.headers["Content-Type"]) {
        opts.headers = {
          ...opts.headers,
          ...defaultHeaders,
        };
      }

      req.write(data);
    }

    req.end();
  });
}
