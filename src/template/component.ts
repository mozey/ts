import { sprintf } from "sprintf-js"
import { ShadowMode } from "./utils"

export class ComponentOptions {
    // Unique tag name of the custom element
    name!: string;
    // ID of the template to use
    templateID!: string
    // Inject app.css into shadow root
    injectAppStyle?: boolean = false
}

export class Component {
    /**
     * Define a custom HTML element, i.e. "Web Component",
     * using a template tag that is already defined on the page
     * @param options
     */
    static define(options: ComponentOptions) {
        try {
            customElements.define(options.name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        const shadowRoot = this.attachShadow({ 
                            mode: ShadowMode.open 
                        }) as ShadowRoot;
                        let template = 
                            document.getElementById(options.templateID) as 
                            HTMLTemplateElement;
                        let clone = template.content.cloneNode(true)
                        if (options.injectAppStyle) {
                            // TODO If app styles are included with a link tag,
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
     * @param options
     * @param template Template HTML
     */
    static defineFromString(options: ComponentOptions, template: string) {
        // Append template
        let templateElement = document.createElement("template");
        templateElement.id = options.templateID;
        templateElement.innerHTML = template;
        document.body.appendChild(templateElement)
        // Define custom element
        this.define(options)
    }

    /**
     * Append custom element to a container
     * @param selector Selector for the container
     * @param name Name of the custom element
     * @param tagID ID of the custom element to append
     */
    static append(selector: string, name: string, tagID?: string) {
        let container = document.querySelector(selector) as HTMLElement
        if (container) {
            let e = document.createElement(name) as HTMLElement
            if (tagID) {
                e.id = tagID
            }
            container.appendChild(e)
        } else {
            console.error(sprintf("selector not found %s", selector))
        }
    }
}
