import { sprintf } from "sprintf-js";
import { Template, TemplateOptions, TemplateVariable } from "./template";

export namespace index {
    let loadTemplateCounter = 1

    export function template() {
        let template =
            document.getElementById('my-paragraph') as HTMLTemplateElement
        let templateContent = template.content.cloneNode(true);
        document.body.appendChild(templateContent);
    }

    export function loadTemplate() {
        // Note that the style in the template is only applied once,
        // and only if this example runs before the tag example
        let options = new TemplateOptions()
        let variables: TemplateVariable[] = [
            new TemplateVariable("Counter", sprintf("%i", loadTemplateCounter)),
            new TemplateVariable(
                "Append", (loadTemplateCounter > 1) ? "times" : "time"),
        ]
        options.variables = variables
        let template = new Template(options)
        template.load("examples/templates/my-paragraph.html");
        loadTemplateCounter++
    }
}

