import { ApidefConfig } from "../index";
declare const configUtil: {
    getConfig(): ApidefConfig;
    getPropSrcPath(): string;
    getPropBaseUri(): string;
};
export default configUtil;
