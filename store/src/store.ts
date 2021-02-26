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

// TODO Move interface defs below to a separate file?

// Item is a generic good or service
export interface Item {
    sku: string
    name: string
    currency: string
    price: bigint
}

// StripeProduct as returned by /v1/products
export interface StripeProduct {
    id: string
    name: string
}

// StripeProduct as returned by /v1/prices
export interface StripePrice {
    product: string // Maps to StripeProduct.id
    currency: string
    unit_amount: bigint
}

/**
 * Store creates a simplified and uniform wrapper around various APIs.
 * It does not try to support all API features,
 * rather focus on common denominators to cover the widest range of use cases.
 * For fuller integration with specific APIs, this code can be a starting point
 */
export class Store {
    readonly data: Item[]

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
     * NOTE The Stripe "skus API" is not used. However,
     * this func could be changed so the skus param maps to
     * either the Stripe sku.id or product.id,
     * depending on whether we want to list goods or services
     * https://stripe.com/docs/api/skus/list
     *
     * SKU definition
     * https://en.wikipedia.org/wiki/Stock_keeping_unit
     *
     * Promise.all()
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
     *
     * @param [skus] Filter items by SKU
     *
     */
    public async listItems(skus?: string[]): Promise<Item[]> {
        if (
            this.source == Source.STATIC ||
            this.source == Source.CSV ||
            this.source == Source.JSON
        ) {
            // Use data set by the constructor
            // TODO Filter skus if param is set
            return this.data

        } else if (this.source == Source.API) {
            // Fetch data from the API
            // TODO Pass in ids param if skus is set
            // https://stripe.com/docs/api/products/list
            const products = new Request(
                sprintf("%s/v1/products", agns.config.baseUrlStripe()))
            const prices = new Request(
                sprintf("%s/v1/prices", agns.config.baseUrlStripe()))
            return await Promise.all([
                fetch(products).then(resp => resp.json()),
                fetch(prices).then(resp => resp.json()),
            ]).then(resp => {
                let itemMap = new Map<string, Item>()
                // Products
                resp[0]["data"].forEach((p: StripeProduct) => {
                    itemMap.set(p.id, <Item>{
                        sku: p.id,
                        name: p.name
                    })
                })
                // Prices
                resp[1]["data"].forEach((p: StripePrice) => {
                    // TODO Error handling if p.product not found
                    let item = itemMap.get(p.product)
                    item.currency = p.currency
                    item.price = p.unit_amount
                })
                // Create items array
                let items: Item[] = []
                itemMap.forEach((item: Item) => {
                    items.push(item)
                })
                // Done mapping stripe API to internal data structures
                return items
            })

        } else {
            throw new Error(sprintf("invalid source %s", this.source))
        }
    }

}
