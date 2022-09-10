import { DateTime, DateTimeFormatOptions } from "luxon";
import { sprintf } from 'sprintf-js';

export class DatepickerOptions {
    // Initial values
    year: number = 0
    month: number = 0
    day: number = 0
    time: string = "" // format: HH:MM

    // Selectors for dropdowns.
    // Pass empty string to ignore
    yearSelector: string = ""
    monthSelector: string = ""
    daySelector: string = ""
    timeSelector: string = ""

    // Time can only be selected in this interval.
    // Pass zero to use default
    timeIntervalMinutes: number = 0

    // Allowed date ranges.
    // Pass zero to use default
    yearFrom: number = 0
    yearTo: number = 0
    monthFrom: number = 0
    monthTo: number = 0

    // TODO allowedDays e.g. ["sat", "sun"]
    //allowedDays: []string

    // Allowed time range.
    // Pass empty string to use default
    timeFrom: string = ""
    timeTo: string = ""
}

export class DatepickerTime {
    hour: number = 0
    minute: number = 0
    second: number = 0
}

export class DatepickerValue {
    value: string = ""
    display: string = ""
}

export class DatepickerDate {
    year: number = 0
    month: number = 0
    day: number = 0
    time: string = ""
}

export class Datepicker {
    options: DatepickerOptions

    // Current value
    current: DatepickerDate

    // Compiled render functions
    compiledYear!: (data: object) => string
    compiledMonth!: (data: object) => string
    compiledDay!: (data: object) => string
    compiledTime!: (data: object) => string

    constructor(options: DatepickerOptions) {
        // Shallow copy
        this.options = { ...options }

        // console.info("options", JSON.stringify(this.options, null, "  "))

        let now = DateTime.local();

        // Fill missing
        this.options.year = this.options.year || 0
        this.options.month = this.options.month || 0
        this.options.day = this.options.day || 0
        this.options.time = this.options.time || "00:00"
        this.options.yearSelector = this.options.yearSelector || ""
        this.options.monthSelector = this.options.monthSelector || ""
        this.options.daySelector = this.options.daySelector || ""
        this.options.timeSelector = this.options.timeSelector || ""
        this.options.timeIntervalMinutes =
            this.options.timeIntervalMinutes || 0
        this.options.yearFrom = this.options.yearFrom || 0
        this.options.yearTo = this.options.yearTo || 0
        this.options.monthFrom = this.options.monthFrom || 0
        this.options.monthTo = this.options.monthTo || 0
        this.options.timeFrom = this.options.timeFrom || ""
        this.options.timeTo = this.options.timeTo || ""

        // ...year range
        if (this.options.yearFrom <= 0) {
            this.options.yearFrom = now.year
        }
        if (this.options.yearTo <= 0) {
            this.options.yearTo = now.year + 10
        } else if (this.options.yearTo < this.options.yearFrom) {
            this.options.yearTo = this.options.yearFrom
        }
        // ...month range
        if (this.options.monthFrom <= 0) {
            this.options.monthFrom = now.month
        }
        if (this.options.monthTo <= 0) {
            this.options.monthTo = 12
        } else if (this.options.monthTo < this.options.monthFrom) {
            this.options.monthTo = this.options.monthFrom
        }

        // ...time interval
        if (this.options.timeIntervalMinutes === 0) {
            this.options.timeIntervalMinutes = 15
        }

        // ...time range
        if (this.options.timeFrom === "") {
            this.options.timeFrom = "00:00"
        }
        if (this.options.timeTo === "") {
            let m = this.options.timeIntervalMinutes
            this.options.timeTo = "23:" + String((60 / m - 1) * m)
        }

        // Default values
        this.current = new DatepickerDate()
        if (this.options.year === 0) {
            this.current.year = now.year
        } else {
            this.current.year = this.options.year
        }
        if (this.options.month === 0) {
            this.current.month = now.month
        } else {
            this.current.month = this.options.month
        }
        if (this.options.day === 0) {
            this.current.day = now.day
        } else {
            this.current.day = this.options.day
        }
        let t = this.parseTime(this.options.time)
        this.current.time = this.formatTime(t)

        // console.info("options", JSON.stringify(this.options, null, "  "))
        // console.info("current", JSON.stringify(this.current, null, "  "))
    }

    /**
     * @param time Format: HH:MM
     */
    parseTime(time: string) {
        let m = time.match(/^(\d\d):(\d\d)$/)
        m = m ? m : []
        let t = new DatepickerTime()
        if (m.length === 3) {
            t.hour = Number(m[1])
            t.minute = Number(m[2])
        } else {
            t.hour = 0
            t.minute = 0
        }
        t.second = 0 // TODO Support seconds?
        return t
    }

    formatMonth(month: number) {
        let v = String(month)
        if (v.length < 2) {
            v = "0" + v
        }
        return v
    }

    formatDay(day: number) {
        let v = String(day)
        if (v.length < 2) {
            v = "0" + v
        }
        return v
    }

    formatTime(t: DatepickerTime) {
        let h = String(t.hour)
        let m = String(t.minute)
        if (h.length < 2) {
            h = "0" + h
        }
        if (m.length < 2) {
            m = "0" + m
        }
        return h + ":" + m
    }

    getYears(): DatepickerValue[] {
        let year = this.options.yearFrom
        let values: DatepickerValue[] = []

        let i = 0
        let d = new DatepickerValue()
        d.value = String(year)
        d.display = String(year)
        values[i] = d
        year++
        i++

        while (year <= this.options.yearTo) {
            let d = new DatepickerValue()
            d.value = String(year)
            d.display = String(year)
            values[i] = d
            year++
            i++
        }

        return values
    }

    getMonthDisplay(month: number) {
        let m = String(month)
        if (m.length < 2) {
            m = "0" + m
        }
        let c = DateTime.fromISO("2020-" + m + "-01")
        let options = { month: "short" } as DateTimeFormatOptions
        return c.toLocaleString(options)
    }

    getMonths(): DatepickerValue[] {
        let month = this.options.monthFrom
        if (this.current.year > this.options.yearFrom) {
            month = 1
        }

        let values: DatepickerValue[] = []

        let i = 0
        let d = new DatepickerValue()
        d.value = String(month)
        d.display = this.getMonthDisplay(month)
        values[i] = d
        month++
        i++

        while (month <= this.options.monthTo) {
            let d = new DatepickerValue()
            d.value = String(month)
            d.display = this.getMonthDisplay(month)
            values[i] = d
            month++
            i++
        }

        return values
    }

    toString() {
        let month = this.formatMonth(this.current.month)
        let day = this.formatDay(this.current.day)
        return String(this.current.year) + "-" +
            month + "-" + day + "T" + this.current.time + ":00"
    }

    getDays(): DatepickerValue[] {
        let values: DatepickerValue[] = []

        let i = 0
        let day = 1
        let d = new DatepickerValue()
        d.value = String(day)
        d.display = String(day)
        values[i] = d
        day++
        i++

        // Get last day of the current year and month.
        // Always use first day to avoid invalid dates
        let s = String(this.current.year) + "-" +
            this.formatMonth(this.current.month) + "-01"
        // console.info("s", s)
        let c = DateTime.fromISO(s)
        c = c.endOf("month")
        let lastDay = c.day

        while (day <= lastDay) {
            let d = new DatepickerValue()
            d.value = String(day)
            d.display = String(day)
            values[i] = d
            day++
            i++
        }

        return values
    }

    getTimes(): DatepickerValue[] {
        let values: DatepickerValue[] = []

        let i = 0
        let t = new DatepickerTime()
        if (this.options.timeFrom !== "") {
            let f = this.parseTime(this.options.timeFrom)
            t.hour = f.hour
            t.minute = f.minute
        }

        let s = this.formatTime(t)
        while (s <= this.options.timeTo) {
            let d = new DatepickerValue()
            d.value = String(this.formatTime(t))
            d.display = d.value
            values[i] = d

            t.minute += this.options.timeIntervalMinutes
            if (t.minute >= 60) {
                t.minute = 0
                t.hour++
            }
            s = this.formatTime(t)
            i++
        }

        return values
    }

    /**
     * @param year Selected value
     */
    private renderYears(year: number) {
        let values = { values: this.getYears() }
        // console.info("values", JSON.stringify(values, null, "  "))
        let e = document.querySelector(this.options.yearSelector) as
            HTMLSelectElement
        if (e) {
            e.innerHTML = this.compiledYear(values)
            let l = values.values.length
            if (l > 0) {
                let firstYear = Number(values.values[0].value)
                let lastYear = Number(values.values[l - 1].value)
                if (year > 0 && year >= firstYear && year <= lastYear) {
                    e.value = sprintf("%i", year)
                } else {
                    this.current.year = firstYear
                }
            }
        }
    }

    /**
     * @param month Selected value
     */
    private renderMonths(month: number) {
        let values = { values: this.getMonths() }
        // console.info("values", JSON.stringify(values, null, "  "))
        let e = document.querySelector(this.options.monthSelector) as
            HTMLSelectElement
        if (e) {
            e.innerHTML = this.compiledMonth(values)
            let l = values.values.length
            if (l > 0) {
                let firstMonth = Number(values.values[0].value)
                let lastMonth = Number(values.values[l - 1].value)
                if (month > 0 && month >= firstMonth && month <= lastMonth) {
                    e.value = sprintf("%i", month)
                } else {
                    this.current.month = firstMonth
                }
            }
        }
    }

    /**
     * @param day Selected value
     */
    private renderDays(day: number) {
        let values = { values: this.getDays() }
        // console.info("values", JSON.stringify(values, null, "  "))
        let e = document.querySelector(this.options.daySelector) as
            HTMLSelectElement
        if (e) {
            e.innerHTML = this.compiledDay(values)
            let l = values.values.length
            if (l > 0) {
                let firstDay = Number(values.values[0].value)
                let lastDay = Number(values.values[l - 1].value)
                if (day > 0 && day >= firstDay && day <= lastDay) {
                    e.value = sprintf("%i", day)
                } else {
                    this.current.day = firstDay
                }
            }
        }
    }

    /**
     * @param time Selected value
     */
    private renderTimes(time: string) {
        let values = { values: this.getTimes() }
        // console.info("values", JSON.stringify(values, null, "  "))
        let e = document.querySelector(this.options.timeSelector) as
            HTMLSelectElement
        if (e) {
            e.innerHTML = this.compiledTime(values)
            if (time !== "") {
                e.value = time
            }
        }
    }

    /**
     * Bind change events
     */
    private bind() {
        // year
        let yearElement = document.querySelector(this.options.yearSelector) as
            HTMLSelectElement
        if (yearElement) {
            // Add an event listener to an element
            // https://www.w3schools.com/jsref/met_element_addeventlistener.asp
            yearElement.addEventListener("change", () => {
                this.current.year = Number(yearElement.value)
                this.renderMonths(this.current.month)
                this.renderDays(this.current.day)
            })
        }
        
        // month
        let monthElement = document.querySelector(this.options.monthSelector) as
            HTMLSelectElement
        if (monthElement) {
            monthElement.addEventListener("change", () => {
                this.current.month = Number(monthElement.value)
                this.renderDays(this.current.day)
            })
        }

        // day
        let dayElement = document.querySelector(this.options.daySelector) as
            HTMLSelectElement
        if (dayElement) {
            dayElement.addEventListener("change", () => {
                this.current.day = Number(dayElement.value)
            })
        }

        // time
        let timeElement = document.querySelector(this.options.timeSelector) as
            HTMLSelectElement
        if (timeElement) {
            timeElement.addEventListener("change", () => {
                this.current.time = String(timeElement.value)
            })
        }
    }

    render() {
        // Log error if selectors not found
        let yearElement = document.querySelector(this.options.yearSelector) as
            HTMLSelectElement
        if (!yearElement) {
            console.error(
                sprintf("year select not found %s", this.options.yearSelector))
        }
        let monthElement = document.querySelector(this.options.monthSelector) as
            HTMLSelectElement
        if (!monthElement) {
            console.error(
                sprintf("year select not found %s", this.options.monthSelector))
        }
        let dayElement = document.querySelector(this.options.daySelector) as
            HTMLSelectElement
        if (!dayElement) {
            console.error(
                sprintf("year select not found %s", this.options.daySelector))
        }
        let timeElement = document.querySelector(this.options.timeSelector) as
            HTMLSelectElement
        if (!timeElement) {
            console.error(
                sprintf("year select not found %s", this.options.timeSelector))
        }

        // Compile render functions
        // let directive = {
        //     "option": {
        //         "value<-values": {
        //             "@value": "value.value",
        //             ".": "value.display"
        //         }
        //     }
        // }
        // this.compiledYear = $(this.options.yearSelector).compile(directive)
        // this.compiledMonth = $(this.options.monthSelector).compile(directive)
        // this.compiledDay = $(this.options.daySelector).compile(directive)
        // if (this.options.timeSelector !== "") {
        //     this.compiledTime = $(this.options.timeSelector).compile(directive)
        // }

        // Render and set initial values
        this.renderYears(this.options.year)
        this.renderMonths(this.options.month)
        this.renderDays(this.options.day)
        this.renderTimes(this.options.time)

        this.bind()
    }
}

