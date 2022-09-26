import { sprintf } from "sprintf-js"
import { ShadowMode } from "./utils"

export class DefineComponentOptions {
    // Unique tag name of the custom element
    name!: string;
    // ID of the template to use
    templateID!: string
    // Inject app.css into shadow root
    injectAppStyle?: boolean = false
}

export class AppendComponentOptions {
    // Selector for the container where the element is appended
    selector!: string
    // Unique name for the custom element
    name!: string
    // Unique ID for the custom element
    tagID?: string
    // Wrapper elements can be used for structural styles
    wrapper?: HTMLElement
}

export class Component {
    /**
     * Define a custom HTML element, i.e. "Web Component",
     * using a template tag that is already defined on the page
     * @param options
     */
    static define(options: DefineComponentOptions) {
        try {
            customElements.define(options.name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        const shadowRoot = this.attachShadow({ 
                            mode: ShadowMode.open 
                        }) as ShadowRoot
                        let template = 
                            document.getElementById(options.templateID) as 
                            HTMLTemplateElement
                        let clone = template.content.cloneNode(true)
                        if (options.injectAppStyle) {
                            // TODO If app styles are included with a link tag,
                            // injecting it will make another network request.
                            // That can be avoided by inlining app.css in a 
                            // style tag as part of the build process
                            let appStyle = document.getElementById(
                                "app-css") as HTMLElement
                            shadowRoot.appendChild(appStyle.cloneNode(true))
                        }
                        shadowRoot.appendChild(clone)
                    }
                }
            )
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
    static defineFromString(options: DefineComponentOptions, template: string) {
        // Append template
        let templateElement = document.createElement("template")
        templateElement.id = options.templateID
        templateElement.innerHTML = template
        document.body.appendChild(templateElement)
        // Define custom element
        this.define(options)
    }

    /**
     * Append custom element to a container
     * @param options
     */
    static append(options: AppendComponentOptions) {
        let container = document.querySelector(options.selector) as HTMLElement
        if (container) {
            let e = document.createElement(options.name) as HTMLElement
            if (options.tagID) {
                e.id = options.tagID
            }
            if (options.wrapper) {
                options.wrapper.appendChild(e)
                container.appendChild(options.wrapper)
            } else {
                container.appendChild(e)
            }
        } else {
            console.error(sprintf("selector not found %s", options.selector))
        }
    }
}
