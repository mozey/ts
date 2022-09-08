import { Component } from "./component";

export namespace index {
    export function shadowDOM() {
        Component.defineCustomElement("my-paragraph", "my-paragraph-sd")
    }

    export function namedSlots() {
        // Creating a template with some slots
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#creating_a_template_with_some_slots
        customElements.define('element-details',
            class extends HTMLElement {
                constructor() {
                    super();
                    const template = 
                        document.getElementById('element-details-template') as 
                        HTMLTemplateElement;
                    let templateContent = template.content;
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(templateContent.cloneNode(true));
                }
            }
        );
    }

    export function component() {
        console.info("TODO")
    }

    export function componentUsingVueJS() {
        console.info("TODO")
    }
}