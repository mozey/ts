import { DateTime } from "luxon";

export namespace index {
    export function sayHello() {
        let now = DateTime.local();
        console.info(now.toString())
    }
}
