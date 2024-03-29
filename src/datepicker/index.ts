import { DateTime } from "luxon";
import { sprintf } from "sprintf-js";
import { DatepickerOptions, Datepicker } from "./datepicker";
import { Component } from "../template/component";

export namespace index {
    let appendShadowRootCounter = 2

    export function sayHello() {
        let now = DateTime.local();
        console.info(now.toString())
    }

    function newDatepicker(id: string, container: HTMLElement|ShadowRoot) {
        let o = new DatepickerOptions()
        o.year = 2021
        o.month = 1
        o.day = 30
        o.time = "16:45"
        let dp = new Datepicker(container, o)
        dp.render()
        // Format date on button click
        let formatButton = container.querySelector("#format") as
            HTMLButtonElement
        if (formatButton) {
            formatButton.addEventListener("click", () => {
                let d = DateTime.fromISO(dp.toString())
                let formatted = d.toRFC2822()
                console.info(id, formatted)
                let span = container.querySelector("#date") as
                    HTMLSpanElement
                span.innerText = formatted
            })
        }
    }

    export function appendSingle() {
        // Single click only
        let datePicker = "date-picker"
        let id = sprintf("%s-1", datePicker)
        let container = document.querySelector(sprintf("#%s", id)) as 
            HTMLElement
        if (container) {
            console.info(sprintf("Container with ID %s already appended", id))
            return
        }

        // Clone template and wrap in div
        let template =
        document.getElementById(sprintf("%s-template", datePicker)) as 
            HTMLTemplateElement
        let templateContent = template.content.cloneNode(true) as HTMLElement
        let div = templateContent.querySelector("div") as HTMLElement
        div.id = id
        let wrapper = document.createElement("div") as HTMLElement
        wrapper.classList.add("block")
        wrapper.appendChild(templateContent)

        // Append
        let root = document.querySelector("#root") as HTMLElement
        root.appendChild(wrapper)
        
        // Render date picker
        container = document.querySelector(sprintf("#%s", id)) as 
            HTMLElement
        if (container) {
            // Prepend header with id
            let header = container.querySelector("h3")
            if (header) {
                header.textContent = sprintf("%s - %s", id, header.textContent)
            }
            newDatepicker(id, container)
        }
    }

    export function appendShadowRoot() {
        // Define custom element
        let datePicker = "date-picker"
        let custom = customElements.get(datePicker)
        if (!custom) {
            Component.define({
                name: datePicker,
                templateID: sprintf("%s-template", datePicker),
                injectAppStyle: true
            })
        }
        
        // Append custom tag
        let id = sprintf("%s-%i", datePicker, appendShadowRootCounter)
        let wrapper = document.createElement("div")
        wrapper.classList.add("block")
        Component.append({
            selector: "#root", 
            name: datePicker, 
            tagID: id,
            wrapper: wrapper
        })

        let e = document.querySelector(sprintf("#%s", id))
        if (e) {
            let container = e.shadowRoot as ShadowRoot
            // Prepend header with id
            let header = container.querySelector("h3")
            if (header) {
                header.textContent = sprintf("%s - %s", id, header.textContent)
            }
            
            // Render date picker in container
            newDatepicker(id, container)
        }
        appendShadowRootCounter++
    }

    export function appendRange() {
        alert("TODO")
        // Example of controller logic with multiple datepickers objects,
        // e.g. end date can't be before start date
    }
}
