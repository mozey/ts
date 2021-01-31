import {Template} from "./template";
import {sprintf} from "sprintf-js";

// app is a singleton
// https://stackoverflow.com/a/30174360/639133
export namespace app {
    export let Version: string
    export let template: Template

    // TODO Create <animals> web component in root div,
    // it must load and render the template with Shadow DOM

    export function main() {
        app.template = new Template()

        app.template.load(
            "https://raw.githubusercontent.com/mozey/ts/main/template/animals.html", () => {
                // This callback runs after the template is loaded into the DOM
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
                $("#root").render(data, directive)
            })
    }
}

