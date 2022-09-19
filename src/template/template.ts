import { sprintf } from "sprintf-js"
import { config } from "../config/config"

export class TemplateVariable {
    // key to replace, e.g. "{{.Key}}"
    key: string = ""
    // value to substitute in key placeholder
    value: string = ""

    constructor(key: string, value: string) {
        this.key = key
        this.value = value
    }
}

export class TemplateOptions {
    // selector for parent element where template will be appended
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    selector: string = "body"
    // variables to set before template is appended, not used with clone method
    variables: TemplateVariable[] = []
}

export class Template {
    options: TemplateOptions

    constructor(options?: TemplateOptions) {
        // Shallow copy
        if (options) {
            this.options = { ...options }
        } else {
            this.options = new TemplateOptions()
        }
    }

    /**
     * Create URL from current document
     * @returns 
     */
    static getBaseURL(): URL {
        let dir = document.location.href
        if (dir.endsWith(".html")) {
            // Remove filename from end of path
            dir = dir.substring(0, dir.lastIndexOf("/")+1)
        }
        let url = new URL(dir)
        return url
    }

    /**
     * Set specified template variables
     * @param s Template string
     * @param variables Variables to set
     * @returns 
     */
    static setVariables(s: string, variables: TemplateVariable[]): string {
        for (var variable of variables) {
            // Replace template variables with values
            let regex = new RegExp(sprintf("{{.%s}}", variable.key), "g")
            s = s.replace(regex, variable.value)
        }
        return s
    }

    /** 
     * Append HTML template
     */ 
    append(container: Element, template: string) {
        // Append the template
        // https://stackoverflow.com/a/7327125/639133
        container.insertAdjacentHTML("beforeend", template)
    }

    /**
     * Fetch HTML template string
     * @param path Path to the template file, or template cache key
     * @param variables Variables to set on template string
     */
     static async fetch(
        baseURL: URL, path: string, variables?: TemplateVariable[]): Promise<string> {

        let template: string
        if (config.TemplateCacheEnabled == "true") {
            // Dynamic fetching of templates can be a good DX.
            // However, allowing dynamic fetching of templates in prod 
            // might not a good idea due to CSP concerns, 
            // see comments for this question
            // https://stackoverflow.com/questions/36631762/returning-html-with-fetch
            if (window.app.templates) {
                return Promise.resolve(window.app.templates.get(path))
            } else {
                return Promise.resolve("Template cache undefined")
            }
        }
        try {
            // Fetch template dynamically from specified path
            let url = baseURL
            url.pathname += path
            let resp = await fetch(url.toString());
            template = await resp.text();
            if (variables) {
                return Template.setVariables(template, variables)
            }
            return template
        } catch (err) {
            console.error(sprintf("load %s", path), err);
            return Promise.resolve("Error fetching template")
        }
    }

    /**
     * Load a template that is not defined in a tag on the page
     * @param path Path to the template file, or template cache key
     */
    async load(url: URL, path: string) {
        let template = await Template.fetch(url, path, this.options.variables)
        let container = document.querySelector(this.options.selector) as 
            HTMLElement
        if (container) {
            this.append(container, template)
        } else {
            console.error(
                sprintf("selector not found %s", this.options.selector))
        }
    }
}
