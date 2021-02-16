import { Express } from "express";
import { ApidefConfig } from "./api/meta";
/**
 * Register your express app instance with apidef routes.
 * @param app
 * @param opts If not provided, the values in apidef-config.json are used; otherwise, this parameter takes precedence.
 */
declare function register(app: Express, opts?: ApidefConfig): void;
declare const apidef: {
    register: typeof register;
};
export default apidef;
