import {index as httpIndexNS} from "./http/index";

// examples is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace examples {
    export let http = httpIndexNS
}
