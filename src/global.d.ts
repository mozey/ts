import { Alpine as AlpineType } from 'alpinejs'
import { app as appNS } from "./app"

declare global {
  var alpine: AlpineType
  var app: appNS
}