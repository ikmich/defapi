/// <reference types="node" />
import { ApiManifest, EndpointDef } from "../api/meta";
import { Response } from "express";
import { HttpError } from "../api/lib/errors";
declare const manifestUtil: {
    hasEndpoints(manifest: ApiManifest): boolean;
};
declare const httpSuccess: (res: Response, data?: any, message?: string | undefined) => void;
declare const httpFail: (res: Response, error: string | Error | HttpError, httpCode?: number | null | undefined, data?: any) => void;
/**
 * Normalize path, remove trailing slash.
 * @param path
 */
declare function _path(path: string | null): string;
declare function _baseUri(baseUri: string): string;
declare function _method(method: string): string;
declare function _def(def: EndpointDef): EndpointDef;
declare function getDefFileStub(def: EndpointDef): string;
declare function yes(o: any): boolean;
declare function no(o: any): boolean;
declare function arrayContains(haystack: any[], needle: any): boolean;
declare function isEmpty(subject: any): boolean;
declare function _fn(f?: () => any): any;
declare function _wait(ms: number): Promise<unknown>;
declare function _slug(s: string): string;
declare function _noSpace(s: string): string;
export declare type DevLogParam = {
    msg: any;
    title?: string | null;
} | string;
declare function devLog(p1: DevLogParam, _console?: Console): void;
export { manifestUtil, httpFail, httpSuccess, _path, _method, _def, yes, no, _fn, isEmpty, arrayContains, _wait, _slug, _noSpace, devLog, getDefFileStub, _baseUri, };
declare const _util: {
    fn(f?: (() => any) | undefined): any;
};
export default _util;
