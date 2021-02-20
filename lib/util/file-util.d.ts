import { DefapiConfig } from '../index';
declare const fileUtil: {
    getBaseDir(): string;
    getConfigPath(): any;
    getSrcPath(conf?: DefapiConfig | undefined): string;
    getDefsDir(conf?: DefapiConfig | undefined): string;
};
export default fileUtil;
