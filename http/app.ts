import {Http, HttpArg, HttpDone} from "http";
import {ResponseGET, ResponsePOST} from "./model/httpbin";
import {Animal} from "./model/animal";
import {sprintf} from "sprintf-js";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export function main() {
        // GET request
        new Http(<HttpArg>{
            url: "https://httpbin.org/get",
            method: Http.GET,
        }).request((resp: HttpDone[]) => {
            // Parse will error if resp is missing required fields as per model
            let r: ResponseGET
            r = JSON.parse(resp[0].data)

            $.growl.notice({
                title: "GET success",
                message: sprintf(
                    "X-Amzn-Trace-Id %s", r.headers["X-Amzn-Trace-Id"])
            })
        })

        // POST request
        let a1: Animal = {
            name: "mouse",
            food: "cheese"
        }
        let a2: Animal = {
            name: "bird",
            food: "seed"
        }
        let animals: Animal[] = [a1, a2]
        new Http(<HttpArg>{
            url: "https://httpbin.org/post",
            method: Http.POST,
            data: JSON.stringify(animals)
        }).request((resp: HttpDone[]) => {
            let r: ResponsePOST
            r = JSON.parse(resp[0].data)

            $.growl.notice({
                title: "POST success",
                message: sprintf(
                    "animals %v", r.json.length)
            })

            $("#root pre").text(JSON.stringify(r, null, "  "))
        })
    }
}
