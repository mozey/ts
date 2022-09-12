import Alpine from "alpinejs"
// import luxon from "luxon";
import { $p as pure } from "pure";
import { index as datepickerIndexNS } from "./datepicker/index";
import { index as httpIndexNS } from "./http/index";
import { index as templateIndexNS } from "./template/index";

// Files to include in the build
import "w3-css/w3.css";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
  export let examples = {
      datepicker: datepickerIndexNS,
      http: httpIndexNS,
      template: templateIndexNS,
  }
}

Alpine.store("data", {
  header: "Mostly TypeScript Examples"
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
