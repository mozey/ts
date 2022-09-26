import Alpine from "alpinejs"
import { Bulma } from "./bulma"
// import luxon from "luxon";
import { $p as pure } from "pure";
import { index as datepickerIndexNS } from "./datepicker/index";
import { index as httpIndexNS } from "./http/index";
import { index as templateIndexNS } from "./template/index";

// Files to include in the build
import "bulma/css/bulma.css";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
  export let examples = {
      datepicker: datepickerIndexNS,
      http: httpIndexNS,
      template: templateIndexNS,
  }

  // Init on DOMContentLoaded, 
  // see www/themes/ts/layouts/partials/script.html
  export function init() {
    Bulma.init()
  }
}

Alpine.store("data", {
  // TODO Example of using store data
  // header: "Mostly TypeScript Examples"
})

// "Extensions must have been registered IN BETWEEN when the Alpine
// global object is imported and when Alpine is initialized with
// the Alpine.start() call"
// https://alpinejs.dev/advanced/extending
Alpine.start()

// Make globals available on window for better DX
window.alpine = Alpine
// window.luxon = luxon
window.pure = pure
window.app = app
