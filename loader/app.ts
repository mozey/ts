import ClickEvent = JQuery.ClickEvent;
import {Http, HttpArg, HttpDone} from "./src/http";
import {ResponseGET} from "./src/model/httpbin";
import {sprintf} from "sprintf-js";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export let Version: string

    export let loader: Loader

    export function main() {
        // Prevent clicking while app is initializing
        $("#loader").show()

        $("#feedback").text("init...")

        // Click handler for request button
        $("#root").on("click", (e: ClickEvent) => {
            if ($(e.target).closest("#request").length === 1) {
                $("#feedback").text("making a request...")

                new Http(<HttpArg>{
                    // Note the max delay is 10s
                    url: "https://httpbin.org/delay/3",
                    method: Http.GET,
                }).request((resp: HttpDone[]) => {
                    // Parse will error if resp is missing required fields as per model
                    let r: ResponseGET
                    r = JSON.parse(resp[0].data)

                    $("#feedback").text("done")
                    $.growl.notice({
                        title: "GET success",
                        message: sprintf(
                            "X-Amzn-Trace-Id %s", r.headers["X-Amzn-Trace-Id"])
                    })
                })
                return
            }
        })

        // Timeout to simulate init
        // TODO Use await for timeout instead?
        // https://stackoverflow.com/a/37764963/639133
        let timeoutS = 2 // seconds
        setTimeout(() => {
            // Prevent clicking while requests are in progress
            app.loader = new Loader("#loader")
            $("#feedback").text("done")

        }, timeoutS*1000)
    }
}

