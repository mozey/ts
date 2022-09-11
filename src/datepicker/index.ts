import { DateTime } from "luxon";
// import { sprintf } from "sprintf-js";
import { DatepickerOptions, Datepicker } from "./datepicker";
// import { Component } from "../template/component";

export namespace index {
    // let appendSingleCounter = 1

    export function sayHello() {
        let now = DateTime.local();
        console.info(now.toString())
    }

    export function appendSingle() {
        let template =
        document.getElementById("date-picker-template") as HTMLTemplateElement
        let templateContent = template.content.cloneNode(true);
        document.body.appendChild(templateContent);
        // TODO Make every appended child have a unique ID
        let container = document.querySelector("#date-picker") as HTMLElement
        if (container) {
            // Render date picker
            let o = new DatepickerOptions()
            o.year = 2021
            o.month = 1
            o.day = 30
            o.time = "16:45"
            let dp = new Datepicker(container, o)
            dp.render()
    
            // Format date on button click
            let formatButton = document.querySelector("#format") as
                HTMLButtonElement
            if (formatButton) {
                formatButton.addEventListener("click", () => {
                    let d = DateTime.fromISO(dp.toString())
                    let formatted = d.toRFC2822()
                    console.info("formatted date", formatted)
                    let span = document.querySelector("#date") as
                        HTMLSpanElement
                    span.innerText = formatted
                })
            }
        }
    }

    export function appendSingleShadowRoot() {
        // TODO Error "The node "option" was not found in the template"
        alert("TODO")
        // let datePicker = "date-picker"
        // Component.define(datePicker, sprintf("%s-template", datePicker), true)
        // let id = sprintf("%s-%i", datePicker, appendSingleCounter)
        // Component.append("body", datePicker, id)
        // let e = document.querySelector(sprintf("#%s", id))
        // if (e) {
        //     let container = e.shadowRoot as ShadowRoot

        //     // Render date picker
        //     let o = new DatepickerOptions()
        //     o.year = 2021
        //     o.month = 1
        //     o.day = 30
        //     o.time = "16:45"
        //     let dp = new Datepicker(container, o)
        //     dp.render()
    
        //     // Format date on button click
        //     let formatButton = document.querySelector("#format") as
        //         HTMLButtonElement
        //     if (formatButton) {
        //         formatButton.addEventListener("click", () => {
        //             let d = DateTime.fromISO(dp.toString())
        //             console.info(d.toRFC2822())
        //         })
        //     }
        // }
        // appendSingleCounter++
    }

    export function appendRange() {
        console.info("TODO")
    }
}
