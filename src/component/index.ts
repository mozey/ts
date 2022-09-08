export namespace index {
    export function shadowDOM() {
        // Define custom element, i.e. "Web Component"
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#using_templates_with_web_components
        try {
            customElements.define('my-paragraph',
                class extends HTMLElement {
                    constructor() {
                        super();
                        let template =
                            document.getElementById('my-paragraph-sd') as
                            HTMLTemplateElement;
                        let templateContent = template.content;

                        const shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(templateContent.cloneNode(true));
                    }
                }
            );
        } catch (error) {
            // Defining the custom element twice throws an exception
            console.info(error)
        }

        // Append custom element to the page
        let e = document.createElement("my-paragraph") as HTMLElement
        document.body.appendChild(e)
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