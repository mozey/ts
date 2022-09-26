import { sprintf } from "sprintf-js";
import { Template, TemplateOptions, TemplateVariable } from "./template";
import { Component } from "./component";

export namespace index {
    let appendFromFileCounter = 1
    let appendCustomElementFromFileCounter = 1
    let namedSlotsCounter = 1

    export function appendFromPage() {
        let id = "my-paragraph"
        let template = document.getElementById(sprintf("%s-template", id)) as 
            HTMLTemplateElement
        let templateContent = template.content.cloneNode(true) as HTMLElement
        let wrapper = templateContent.querySelector("div") as HTMLElement
        wrapper.id = id
        let root = document.querySelector("#root") as HTMLElement
        root.appendChild(templateContent)
    }

    // Note that this method does not create a new template element on the page
    export function appendFromFile() {
        let options = new TemplateOptions()
        let variables: TemplateVariable[] = [
            new TemplateVariable(
                "Counter", sprintf("%i", appendFromFileCounter)),
            new TemplateVariable(
                "Append", (appendFromFileCounter > 1) ? "times" : "time"),
        ]
        options.selector = "#root"
        options.variables = variables
        let template = new Template(options)
        template.load(Template.getBaseURL(), "../data/my-paragraph.html");
        appendFromFileCounter++
    }

    export function appendCustomElementFromPage() {
        let id = "my-paragraph"
        // Note the error that is logged if the customer element already exists.
        // Also note that app.css is not applied by default inside Shadow Root
        Component.define({
            name: id,
            templateID: id
        })
        // Definition errors are caught, so append will always succeed
        Component.append({selector: "#root", name: id})
    }

    // Note that this method creates a new template element on the page,
    // the template element is then cloned when the component is appended
    export function appendCustomElementFromFile() {
        // Generate unique element name and template ID for each function call
        let customElementName = sprintf(
            "my-paragraph-%i", appendCustomElementFromFileCounter)

        let variables: TemplateVariable[] = [
            new TemplateVariable(
                "Counter", sprintf("%i", appendCustomElementFromFileCounter)),
            new TemplateVariable(
                "Append", (appendCustomElementFromFileCounter > 1) ?
                "times" : "time"),
        ]

        Template.fetch(
            Template.getBaseURL(),
            "../data/my-paragraph.html",
            variables).then(template => {
                Component.defineFromString({
                    name: customElementName,
                    templateID: customElementName,
                    injectAppStyle: true
                }, template)
                Component.append({selector: "#root", name: customElementName})
                appendCustomElementFromFileCounter++
            })
    }

    // See "Creating a template with some slots"
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#a_more_involved_example
    export function namedSlots() {
        // Generate unique element name and template ID for each function call
        let customElementName = sprintf(
            "element-details-%i", namedSlotsCounter)

        let appendSnippet = () => {
            let variables: TemplateVariable[] = [
                new TemplateVariable("ElementDetails", customElementName),
            ]
            let options = new TemplateOptions()
            options.selector = "#root"
            options.variables = variables
            let t = new Template(options)
            t.load(Template.getBaseURL(), "../data/element-details.html");
            namedSlotsCounter++
        }
        let defineComponent = (template: string) => {
            Component.defineFromString({
                name: customElementName,
                templateID: customElementName
            }, template)
            appendSnippet()
        }
        Template.fetch(
            Template.getBaseURL(),
            "../data/element-details-template.html").then(
                defineComponent)
    }
}

