import { Alpine as AlpineType } from 'alpinejs'
// import { luxon as LuxonType } from "luxon";
// import { pure as PureType } from "pure-js/pure.js"

import { app as appNS } from "./app"

declare global {
  var alpine: AlpineType
  // var luxon: LuxonType
  // var pure: PureType

  var app: appNS
}