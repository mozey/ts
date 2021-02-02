import {ShadowMode, Template, TemplateOptions} from "./template";
import {sprintf} from "sprintf-js";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export let Host: string
    export let Version: string

    export function main() {
        let data = {
            animals: [
                {
                    name: "mouse",
                    food: "cheese",
                },
                {
                    name: "bird",
                    food: "seed",
                },
                {
                    name: "cat",
                    food: "mouse, bird",
                },
            ]
        }
        let directive = {
            "ul": {
                "animal<-animals": {
                    "li": function (a: any) {
                        return sprintf("%s eats %s",
                            a.item.name,
                            a.item.food)
                    }
                }
            }
        }

        // Example 1............................................................
        // Template is loaded into div element with shadow DOM, and rendered

        let o = new TemplateOptions()
        o.selector = "#animals"
        o.shadowDOM = true
        o.shadowMode = ShadowMode.open
        let templateWithShadowDOM = new Template(o)

        templateWithShadowDOM.load(
            sprintf("%s/animals.html", app.Host), (root: ShadowRoot) => {
                // This callback runs after the template is loaded into the DOM

                // The component DOM element has a "#shadow-root open"
                let component: Element = $("#animals")[0]
                console.info("Component element", component)

                // WARNING The wrapper div is required,
                // render func must not be called on ShadowRoot
                $("div", root).render(data, directive)

                // Outside JS can access the shadow DOM because it's open.
                // Notice the "Default heading" text is replaced by the slot val
                console.info("Render results", component.shadowRoot.innerHTML)
            })


        // Example 2............................................................
        // Template is loaded into custom element with shadow DOM, and rendered

        // TODO Create webcomponent.ts to load static/animals.vue into custom element <ts-animals>
    }
}

