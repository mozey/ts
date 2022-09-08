export class Component {
    /**
     * Define a custom HTML element, i.e. "Web Component"
     * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#using_templates_with_web_components
     * @param name Tag name of the custom element
     * @param id ID of the template tag to use
     */
    static defineCustomElement(name: string, id: string) {
        try {
            customElements.define(name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        let template =
                            document.getElementById(id) as
                            HTMLTemplateElement;
                        let templateContent = template.content;

                        const shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(templateContent.cloneNode(true));
                    }
                }
            );
        } catch (err) {
            // Defining the custom element more than once throws an exception
            console.error(err)
        }

        // Append custom element to the page
        let e = document.createElement(name) as HTMLElement
        document.body.appendChild(e)
    }

    /**
     * 
     * @param selector 
     * @param name 
     */
    static appendCustomElement(selector: string, name: string) {
        console.info(selector, name)
    }
}
