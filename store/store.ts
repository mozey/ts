import axios from 'axios';

// source of inventory data
export enum Source {
    API = "api",
    CSV = "csv",
    JSON = "json",
    PROPS = "props",
}

export class Store {
    constructor() {
    }

    // refresh inventory data from the specified source.
    // This sets products, qty, prices, etc on the store internal data structure
    public refresh(s: Source) {
        if (s == Source.API) {
            this.refreshAPI()
        }
    }

    // TODO Methods for other sources like csv and json
    // refreshAPI sets store data from an external API
    refreshAPI() {
        // TODO Factory to support multiple APIs
        // The code in there is specific to the Stripe API
        let url = "/v1/products"
        let req = axios.get(url)
        req.then(function (resp) {
            if (resp.status == 200) {
                console.info("data", JSON.stringify(resp.data, null, "  "))
            }
        })
    }


}
