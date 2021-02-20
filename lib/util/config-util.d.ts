import { DefapiConfig, Objectx } from '../index';
declare const configUtil: {
    getConfig(): DefapiConfig;
    getSrcPath(): string;
    getBaseUri(): string;
    getTitle(): string;
    getHeaders(): Objectx;
};
export default configUtil;
