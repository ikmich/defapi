import { DefapiConfig } from "../index";
declare const configUtil: {
    getConfig(): DefapiConfig;
    getPropSrcPath(): string;
    getPropBaseUri(): string;
};
export default configUtil;
