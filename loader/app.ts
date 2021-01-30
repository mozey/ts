import {sprintf} from "sprintf-js";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export let Version: string

    export let loader: Loader

    export function main() {
        // Prevent clicking while app is initializing
        $("#loader").show()

        // TODO Use await for timeout instead?
        // https://stackoverflow.com/a/37764963/639133

        $("#feedback").text("init...")

        // Timeout to simulate init
        let timeoutS = 2 // seconds
        setTimeout(() => {
            // Prevent clicking during requests
            app.loader = new Loader("#loader")
            $("#feedback").text("done")

            // TODO Button to make additional requests
        }, timeoutS*1000)
    }
}

