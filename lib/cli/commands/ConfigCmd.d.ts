import BaseCmd from './BaseCmd';
/**
 * Command handler for the `defapi config` command. Creates a defapi-config.json file
 */
export declare class ConfigCmd extends BaseCmd {
    run(): Promise<void>;
}
