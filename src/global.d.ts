// Third-party libs
import { Alpine as AlpineType } from 'alpinejs'
// import { luxon as LuxonType } from "luxon";
import { $p as PureType } from "pure"
// app
import { app as appNS } from "./app"

declare global {
  var alpine: AlpineType
  // var luxon: LuxonType
  var pure: PureType
  // app
  var app: appNS
}
