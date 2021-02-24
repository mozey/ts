// import {Cart} from "./cart";
import {Store} from "./store";

// Config is set by the build script
export interface Config {
    baseUrl: string
    dataUrl: string
    port: string
    source: string
    version: string
}

// Global namespace
// https://stackoverflow.com/a/30174360/639133
export namespace ns {
    export let config: Config
    export let data: any

    // export let cart: Cart
    export let store: Store

    /**
     * @param config Specify key values to override config
     */
    export function main(config?: any) {
        // Config
        // @ts-ignore
        window.nsConfig = window.nsConfig || {}
        if (config) {
            // Override config keys if set
            // @ts-ignore
            for (let k of Object.keys(window.nsConfig)) {
                console.info("k", k)
                if (config[k] && config[k].trim() != "") {
                    // @ts-ignore
                    window.nsConfig[k] = config[k]
                }
            }
        }
        // @ts-ignore
        ns.config = window.nsConfig
        console.info("ns.config", ns.config)

        // Init shared data
        ns.data = {
            message: "Init"
        }

        // ns.cart = new Cart()

        // let s = Source.API
        // let sUrl = sprintf("http://localhost:%s",)
        ns.store = new Store()
    }
}
