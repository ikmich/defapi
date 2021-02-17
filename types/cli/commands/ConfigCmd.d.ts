import BaseCmd from "./BaseCmd";
/**
 * Command handler for the `apidef config` command. Creates a apidef-config.json file
 */
export declare class ConfigCmd extends BaseCmd {
    run(): Promise<void>;
}
