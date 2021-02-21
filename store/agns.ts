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

// agns (application global name space)
// https://stackoverflow.com/a/30174360/639133
export namespace agns {
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
        window.agnsConfig = window.agnsConfig || {}
        if (config) {
            // Override config keys if set
            // @ts-ignore
            for (let k of Object.keys(window.agnsConfig)) {
                console.info("k", k)
                if (config[k] && config[k].trim() != "") {
                    // @ts-ignore
                    window.agnsConfig[k] = config[k]
                }
            }
        }
        // @ts-ignore
        agns.config = window.agnsConfig
        console.info("agns.config", agns.config)

        // Init shared data
        agns.data = {
            message: "Init"
        }

        // agns.cart = new Cart()

        // let s = Source.API
        // let sUrl = sprintf("http://localhost:%s",)
        agns.store = new Store()
    }
}
