import {agns} from "./agns";
import {sprintf} from "sprintf-js";

// Source enums valid data sources
// TODO "props" is not a data source, but they could override,
// not sure that's a good idea though
export enum Source {
    // Static data is set by the index page
    STATIC = "static",
    // Fetch data from API
    API = "api",
    // Data is loaded from CSV file
    CSV = "csv",
    // Data is loaded from JSON file
    JSON = "json",
}

/**
 * Store creates a simplified and uniform wrapper around various APIs.
 * It does not try to support all API features,
 * rather focus on common denominators to cover the widest range of use cases.
 * For fuller integration with specific APIs, this code can be a starting point
 */
export class Store {
    private data: any

    // source determines where inventory data is loaded from
    readonly source: Source

    constructor() {
        let dataUrl = agns.config.dataUrl()
        // @ts-ignore
        if (window.AGNSData != undefined) {
            this.source = Source.STATIC
            // @ts-ignore
            this.data = window.AGNSData
        } else if (dataUrl == "") {
            // Caching is possible but out of scope for this example
            this.source = Source.API
        } else if (dataUrl.endsWith(".csv")) {
            this.source = Source.CSV
            // TODO Load data from CSV file
        } else if (dataUrl.endsWith(".json")) {
            this.source = Source.JSON
            // TODO Load data from JSON file
        }
    }

    /**
     * listItems for sale (goods or services)
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
     * SKU definition
     * https://en.wikipedia.org/wiki/Stock_keeping_unit
     *
     * See article re "Async/await in TypeScript"
     * https://blog.logrocket.com/async-await-in-typescript/
     *
     * @param [skus] Filter items by SKU
     *
     */
    public async listItems(skus?: string[]) {
        // TODO Pass in ids param if skus is set
        // https://stripe.com/docs/api/products/list
        // TODO Fetch products and prices like runAsyncFunctions in link above
        const req = new Request(
            sprintf("%s/v1/products", agns.config.baseUrlStripe()))
        return fetch(req).then(response => response.json());
    }

}
