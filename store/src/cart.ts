import {sprintf} from "sprintf-js";
import {agns} from "./agns";

export class Cart {
    private data: any

    constructor() {
    }

    /**
     * updateItem qty in cart for given sku.
     * If the sku is not yet in the cart it will be added.
     * To remove an item set qty to zero
     *
     * For comparison see `Snipcart.api.cart.items.add` method
     * https://docs.snipcart.com/v3/sdk/api#add
     *
     * @param sku
     * @param qty
     */
    public updateItem(sku: string, qty: number) {
        this.data = this.data || {}
        this.data.skus = this.data.skus || {}
        this.data.skus[sku] = this.data.skus[sku] || {}
        this.data.skus[sku].qty = qty
    }

    /**
     * checkout just posts the cart content to the API
     * Obvious a real world app will be a bit more sophisticated.
     * See for example https://stripe.com/docs/payments/payment-intents
     */
    public async checkout() {
        let body = this.data
        console.info("body", JSON.stringify(body, null, "  "))
        const req = new Request(
            sprintf("%s/v1/orders", agns.config.baseUrlStripe()),
            {
                method: "POST",
                body: body
            })
        return fetch(req).then(response => response.json());
    }
}
