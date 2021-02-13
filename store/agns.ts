import {Source, Store} from "./store";
import {Cart} from "./cart";

// agns (application global name space)
// https://stackoverflow.com/a/30174360/639133
export namespace agns {
    export let Version: string

    export let store: Store
    export let cart: Cart

    // TODO Simplest way to use axios?
    // https://github.com/axios/axios#installing
    // https://unpkg.com/axios/dist/axios.min.js
    export function main() {
        console.info("here")
        agns.store = new Store()
        agns.store.refresh(Source.API)
    }
}
