import { Response } from 'express';
import { HttpError } from '../errors';
import { EndpointDef } from '../index';
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
declare function getDefFileTitle(def: EndpointDef): string;
declare function yes(o: any): any;
declare function no(o: any): boolean;
declare function arrayContains(haystack: any[], needle: any): boolean;
declare function isEmpty(subject: any): boolean;
declare function _wait(ms: number): Promise<unknown>;
declare function _slug(s: string): string;
declare function _noSpace(s: string): string;
export declare type DevLogParam = {
    msg: any;
    title?: string | null;
} | string;
export { httpFail, httpSuccess, _path, _method, _def, yes, no, isEmpty, arrayContains, _wait, _slug, _noSpace, getDefFileTitle, _baseUri };
declare const ut: {
    fn(f?: (() => any) | undefined): any;
};
export default ut;
