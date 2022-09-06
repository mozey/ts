export namespace index {
    export function template() {
        let template =
            document.getElementById('my-paragraph') as HTMLTemplateElement
        let templateContent = template.content.cloneNode(true);
        document.body.appendChild(templateContent);
    }

    export function shadowDOM() {
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
        } catch(error) {
            // Defining the custom element twice throws an exception
            console.info(error)
        }
        let e = document.createElement("my-paragraph") as HTMLElement
        document.body.appendChild(e)
    }
}

