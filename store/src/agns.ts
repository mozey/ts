import {Cart} from "./cart";
import {Config} from "./config";
import {Store} from "./store";

// Global namespace (try to use a unique name for easy grepping)
// https://stackoverflow.com/a/30174360/639133
export namespace agns {
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
        // @ts-ignore
        window.AGNS_DATA["header"] = "Init..."
        setTimeout(function () {
            // This demonstrates "reactively" updating the VueJS state
            // @ts-ignore
            window.AGNS_DATA["header"] = "Stripecart Example"
        }, 2000)

        // Demonstration of store and cart without using components
        agns.store.listItems().then((items) => {
            console.info(
                "agns.store.listItems", JSON.stringify(items, null, "  "))

            agns.cart.updateItem(items[0].sku, 10)

            agns.cart.checkout().then(resp => {
                console.info(
                    "agns.cart.checkout", JSON.stringify(resp, null, "  "))
            })
        })
    }
}
