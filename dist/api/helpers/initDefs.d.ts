import { Express } from "express";
import { DefapiConfig } from "../../index";
export declare type InitDefsResult = {
    error?: string | Error;
    message?: string;
};
/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
declare function initDefs(app: Express, config: DefapiConfig): InitDefsResult;
export default initDefs;
