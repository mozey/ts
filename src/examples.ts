import {Examples as HttpExamples} from "./http/examples";

// examples is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace examples {
    export let Foo: string = "foo"

    // runHttp examples in src/http
    export function runHttp() {
        // TODO This doesn't work because typed-rest-client 
        // is meant for use in NodeJS only?
        let e = new HttpExamples()
        e.run()
    }
}