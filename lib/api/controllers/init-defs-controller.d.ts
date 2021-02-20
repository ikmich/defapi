import { Request, Response } from 'express';
export declare type InitDefsResult = {
    error?: string | Error;
    message?: string;
};
/**
 * Http request handler for generating or updating/refreshing endpoint def files.
 *
 * @param req
 * @param res
 * @param isUpdate
 */
declare function initDefsController(req: Request, res: Response, isUpdate?: boolean): void;
export default initDefsController;
