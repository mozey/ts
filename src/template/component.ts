import { sprintf } from "sprintf-js"
import { ShadowMode } from "./utils"

export class Component {
    /**
     * Define a custom HTML element, i.e. "Web Component",
     * using a template tag that is already defined on the page
     * @param name Name of the custom element
     * @param id ID of the template tag to use
     */
    static define(name: string, id: string) {
        try {
            customElements.define(name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        const shadowRoot = this.attachShadow({ 
                            mode: ShadowMode.open 
                        });
                        let template = document.getElementById(id) as 
                            HTMLTemplateElement;
                        let clone = template.content.cloneNode(true)
                        shadowRoot.appendChild(clone);
                    }
                }
            );
        } catch (err) {
            // Defining the custom element more than once throws an exception
            console.error(err)
        }
    }

    /**
     * Define a custom HTML element using the specified template string
     * @param name Name of the custom element
     * @param template Template string
     */
    static defineString(name: string, template: string) {
        try {
            customElements.define(name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        const shadowRoot = this.attachShadow({ 
                            mode: ShadowMode.open 
                        });
                        // TODO Parse text and append node
                        shadowRoot.textContent = template
                    }
                }
            );
        } catch (err) {
            // Defining the custom element more than once throws an exception
            console.error(err)
        }
    }

    /**
     * Append custom element to the page
     * @param selector 
     * @param name 
     */
    static append(selector: string, name: string) {
        let root = document.querySelector(selector) as Element
        if (root) {
            let e = document.createElement(name) as HTMLElement
            root.appendChild(e)
        } else {
            console.error(sprintf("selector not found %s", selector))
        }
    }
}
