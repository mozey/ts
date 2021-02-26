import {Cart} from "./cart";
import {Config} from "./config";
import {Store} from "./store";

// Global namespace (try to use a unique name for easy grepping)
// https://stackoverflow.com/a/30174360/639133
export namespace agns {
    export let data: any

    export let cart: Cart
    export let config: Config
    export let store: Store

    /**
     * @param config Specify key values to override config
     */
    export function main(config?: any) {
        // Config must be initialized before other services
        agns.config = new Config(config)

        // Services
        agns.cart = new Cart()
        agns.store = new Store()

        // Shared data
        agns.data = {
            header: "Init..."
        }
        setTimeout(function () {
            // This demonstrates "reactively" updating the VueJS state
            // @ts-ignore
            window.agns.data.header = "Stripecart Example"
        }, 2000)

        agns.store.listItems().then((resp) => {
            console.info(
                "agns.store.listItems", JSON.stringify(resp, null, "  "))
        })
    }
}
