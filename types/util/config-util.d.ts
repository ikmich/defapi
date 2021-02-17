import { ApidefConfig } from "../api/meta";
declare const configUtil: {
    getConfig(): ApidefConfig;
    getPropSrcPath(): string;
    getPropBaseUri(): string;
};
export default configUtil;
