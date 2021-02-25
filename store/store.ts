import {agns} from "./agns";
import {sprintf} from "sprintf-js";

// Source of inventory data
export enum Source {
    // Fetch data from API
    API = "api",
    // TODO Load data from JSON file
    JSON = "json",
    // TODO Load data from CSV file
    CSV = "csv",
    // TODO Data is set by the components
    PROPS = "props",
}

export class Store {
    constructor() {
    }

    /**
     * listItems for sale (goods or services)
     * https://en.wikipedia.org/wiki/Stock_keeping_unit
     *
     * The skus param to this func maps to the Stripe product.id,
     * and combines output from the following Stripe APIs
     * https://stripe.com/docs/api/products/list
     * https://stripe.com/docs/api/prices/list
     *
     * NOTE The skus API is not used. However,
     * this func could be changed so the skus params maps to
     * either the Stripe sku.id or product.id,
     * depending on whether we want to list goods or services
     * https://stripe.com/docs/api/skus/list
     *
     * See article re "Async/await in TypeScript"
     * https://blog.logrocket.com/async-await-in-typescript/
     *
     * @param [skus] Filter items by SKU
     *
     */
    public async listItems(skus?: string[]) {
        // TODO Pass in ids param if set
        // https://stripe.com/docs/api/products/list
        // TODO Fetch products and prices like runAsyncFunctions in link above
        const req = new Request(
            sprintf("%s/v1/products", agns.config.baseUrlStripe()))
        return fetch(req).then(response => response.json());
    }

    // constructor(s: Source, sUrl: string) {
    //     if (s == Source.CSV) {
    //         this.refreshAPI()
    //     } else if (s == Source.JSON) {
    //
    //     }
    // }

    // // refresh inventory data from the specified source.
    // // This sets products, qty, prices, etc on the store internal data structure
    // public refresh(s: Source) {
    //     if (s == Source.API) {
    //         this.refreshAPI()
    //     }
    // }
    //
    // // TODO Methods for other sources like csv and json
    // // refreshAPI sets store data from an external API
    // refreshAPI() {
    //     // TODO Factory to support multiple APIs
    //     // The code in there is specific to the Stripe API
    //     let url = "/v1/products"
    //     let req = axios.get(url)
    //     req.then(function (resp) {
    //         if (resp.status == 200) {
    //             console.info("data", JSON.stringify(resp.data, null, "  "))
    //         }
    //     })
    // }


}
