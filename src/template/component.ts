import { sprintf } from "sprintf-js"
import { ShadowMode } from "./utils"

export class Component {
    /**
     * Define a custom HTML element, i.e. "Web Component",
     * using a template tag that is already defined on the page
     * @param name Name of the custom element
     * @param id ID of the template tag to use
     * @param injectAppStyle Inject app.css into shadow root
     */
    static define(name: string, id: string, injectAppStyle?: boolean) {
        try {
            customElements.define(name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        const shadowRoot = this.attachShadow({ 
                            mode: ShadowMode.open 
                        }) as ShadowRoot;
                        let template = document.getElementById(id) as 
                            HTMLTemplateElement;
                        let clone = template.content.cloneNode(true)
                        if (injectAppStyle) {
                            // If app styles are included with a link tag,
                            // injecting it will make another network request.
                            // That can be avoided by inlining app.css in a 
                            // style tag as part of the build process
                            let appStyle = document.getElementById(
                                "app-stylesheet") as HTMLElement
                            shadowRoot.appendChild(appStyle.cloneNode(true))
                        }
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
     * Define a Web Component using the specified HTML string.
     * A template element (with ID as specified) is first appended to the page.
     * For templates that already exist on the page, 
     * use the Component.define method instead
     * @param name Name of the custom element
     * @param id ID of the template tag to create
     * @param template Template HTML
     * @param injectAppStyle Inject app.css into shadow root
     */
    static defineFromString(
        name: string, id: string, template: string, injectAppStyle?: boolean) {
        // Append template
        let templateElement = document.createElement("template");
        templateElement.id = id;
        templateElement.innerHTML = template;
        document.body.appendChild(templateElement)
        // Define custom element
        this.define(name, id, injectAppStyle)
    }

    /**
     * Append custom element to a container
     * @param selector Selector for the container
     * @param name Name of the custom element
     */
    static append(selector: string, name: string) {
        let container = document.querySelector(selector) as HTMLElement
        if (container) {
            let e = document.createElement(name) as HTMLElement
            container.appendChild(e)
        } else {
            console.error(sprintf("selector not found %s", selector))
        }
    }
}
