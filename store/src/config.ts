// TODO Generate this file from JSON using https://github.com/mozey/config

export class Config {
    // TODO Avoid using any
    // readonly config: Record<string, string>
    readonly config: any

    /**
     * @param config Overrides
     */
    constructor(config?: any) {
        // Copy defaults
        // @ts-ignore
        let defaultConfig = {...window.AGNSConfig}
        if (config) {
            // @ts-ignore
            for (let k of Object.keys(defaultConfig)) {
                // Override default config by key if value is not empty
                if (config[k] && config[k].trim() != "") {
                    // @ts-ignore
                    defaultConfig[k] = config[k]
                }
            }
        }
        // Config with user overrides
        this.config = defaultConfig
    }

    public baseUrlSearch(): string {
        return this.config["baseUrlSearch"]
    }

    public baseUrlStripe(): string {
        return this.config["baseUrlStripe"]
    }

    public dataUrl(): string {
        return this.config["dataUrl"]
    }

    public port(): string {
        return this.config["port"]
    }

    public version(): string {
        return this.config["version"]
    }
}