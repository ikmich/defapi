import { ApidefConfig } from "../meta";
import { Express } from "express";
export declare type InitDefsResult = {
    error?: string | Error;
    message?: string;
};
/**
 * Generate endpoint def files from the current list of endpoints.
 * @param app
 * @param config
 */
declare function initDefs(app: Express, config: ApidefConfig): InitDefsResult;
export default initDefs;
