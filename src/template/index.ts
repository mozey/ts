import { sprintf } from "sprintf-js";
import { Template, TemplateOptions, TemplateVariable } from "./template";
import { Component } from "./component";

export namespace index {
    let appendFromFileCounter = 1
    let appendCustomElementFromFileCounter = 1

    export function appendFromPage() {
        let template =
            document.getElementById('my-paragraph') as HTMLTemplateElement
        let templateContent = template.content.cloneNode(true);
        document.body.appendChild(templateContent);
    }

    // Note that this method does not create a new template element on the page
    export function appendFromFile() {
        let options = new TemplateOptions()
        let variables: TemplateVariable[] = [
            new TemplateVariable("Counter", sprintf("%i", appendFromFileCounter)),
            new TemplateVariable(
                "Append", (appendFromFileCounter > 1) ? "times" : "time"),
        ]
        options.variables = variables
        let template = new Template(options)
        template.load("examples/templates/data/my-paragraph.html");
        appendFromFileCounter++
    }

    export function appendCustomElementFromPage() {
        let customElementName = "my-paragraph"
        // Note the error that is logged if the customer element already exists.
        // Also note that app.css is not applied by default inside Shadow Root
        Component.define(customElementName, "my-paragraph")
        // Definition errors are caught, so append will always succeed
        Component.append("body", customElementName)
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
            "examples/templates/data/my-paragraph.html",
            variables).then(template => {
                Component.defineFromString(
                    customElementName, customElementName, template, true)
                Component.append("body", customElementName)
                appendCustomElementFromFileCounter++
            })
    }

    export function namedSlots() {
        // TODO
        alert("Not implemented")
        // // Creating a template with some slots
        // // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#creating_a_template_with_some_slots
        // customElements.define('element-details',
        //     class extends HTMLElement {
        //         constructor() {
        //             super();
        //             const template = 
        //                 document.getElementById('element-details-template') as 
        //                 HTMLTemplateElement;
        //             let templateContent = template.content;
        //             const shadowRoot = this.attachShadow({ mode: 'open' });
        //             shadowRoot.appendChild(templateContent.cloneNode(true));
        //         }
        //     }
        // );
    }

    export function componentUsingVueJS() {
        console.info("TODO")
    }
}

