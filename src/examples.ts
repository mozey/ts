import { index as componentIndexNS } from "./component/index";
import { index as httpIndexNS } from "./http/index";
import { index as templateIndexNS } from "./template/index";

// examples is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace examples {
    export let component = componentIndexNS
    export let http = httpIndexNS
    export let template = templateIndexNS
}
