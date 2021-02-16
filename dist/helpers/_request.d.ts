/// <reference types="node" />
import { IncomingMessage } from "http";
export declare type TRequestOpts = {
    baseUri: string;
    path: string;
    method: string;
    jsonBody?: object;
    headers?: any;
};
export declare type TRequestResult = {
    res: IncomingMessage;
    raw: string;
};
export default function _request(opts: TRequestOpts): Promise<TRequestResult>;
