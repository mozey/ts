import Alpine from 'alpinejs'
import { examples as ExamplesNS } from "./examples"
import 'w3-css/w3.css';

// Make globals available on window for better DX
window.alpine = Alpine
window.examples = ExamplesNS

Alpine.store("data", {
  examples: "Examples"
})

// "Extensions must have been registered IN BETWEEN when the Alpine
// global object is imported and when Alpine is initialized with
// the Alpine.start() call"
Alpine.start()
