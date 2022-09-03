import { Alpine as AlpineType } from 'alpinejs'
import { examples as ExamplesNS } from "./examples"

declare global {
  var alpine: AlpineType
  var examples: ExamplesNS
}