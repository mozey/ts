import { DateTime } from "luxon";

export namespace index {
    export function sayHello() {
        let now = DateTime.local();
        console.info(now.toString())
    }

    export function appendSingle() {
        console.info("TODO")
//         // Render date picker
//         let o = new DatepickerOptions()
//         o.year = 2021
//         o.month = 1
//         o.day = 30
//         o.time = "16:45"
//         o.yearSelector = "#year"
//         o.monthSelector = "#month"
//         o.daySelector = "#day"
//         o.timeSelector = "#time"
//         this.datePicker = new Datepicker(o)
//         this.datePicker.render()

//         // Format date on button click
//         $("#root").on("click", (e: ClickEvent) => {
//             if ($(e.target).closest("#format").length === 1) {
//                 let d = DateTime.fromISO(this.datePicker.toString())
//                 $("#date").text(d.toRFC2822())
//                 return
//             }
//         });
    }

    export function appendRange() {
        console.info("TODO")
    }
}
