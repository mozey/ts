import {Template} from "./template";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export let Version: string
    export let template: Template

    export function main() {
        app.template = new Template()

        $("div#root").html("TODO")
        // TODO Push ts/template before uncommenting below
        // app.template.load(
        //     "https://raw.githubusercontent.com/mozey/ts/main/template/animals.html", () => {
        //     })
    }
}
