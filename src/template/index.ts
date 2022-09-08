import { sprintf } from "sprintf-js";
import { Template, TemplateOptions, TemplateVariable } from "./template";
import { Component } from "./component";

export namespace index {
    let loadTemplateCounter = 1

    export function template() {
        let template =
            document.getElementById('my-paragraph') as HTMLTemplateElement
        let templateContent = template.content.cloneNode(true);
        document.body.appendChild(templateContent);
    }

    export function loadTemplate() {
        // Note that the style in the template is only applied once,
        // and only if this example runs before the tag example
        let options = new TemplateOptions()
        let variables: TemplateVariable[] = [
            new TemplateVariable("Counter", sprintf("%i", loadTemplateCounter)),
            new TemplateVariable(
                "Append", (loadTemplateCounter > 1) ? "times" : "time"),
        ]
        options.variables = variables
        let template = new Template(options)
        template.load("examples/templates/_my-paragraph.html");
        loadTemplateCounter++
    }

    // TODO Template not displayed?
    export function shadowDOM() {
        let options = new TemplateOptions()
        options.shadowDOM = true
        let variables: TemplateVariable[] = [
            new TemplateVariable("Counter", sprintf("%i", loadTemplateCounter)),
            new TemplateVariable(
                "Append", (loadTemplateCounter > 1) ? "times" : "time"),
        ]
        options.variables = variables
        let template = new Template(options)
        template.load("examples/templates/_my-paragraph.html");
        loadTemplateCounter++
    }

    export function customElement() {
        let customElementName = "my-paragraph"
        Component.define(customElementName, "my-paragraph-sd")
        Component.append("body", customElementName)
    }

    export function loadCustomElement() {
        let customElementName = "my-paragraph-2"
        // TODO Load template string from file (or cache)
        Component.defineString(customElementName, "<p>foo</p>")
        Component.append("body", customElementName)
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

