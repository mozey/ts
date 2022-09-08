import { sprintf } from "sprintf-js"
import { ShadowMode } from "./utils"
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
    // baseURL
    baseURL: URL = new URL(document.location.origin)
    // selector for parent element where template will be inserted
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    selector: string = "#root"
    // shadowDOM flag is false by default
    shadowDOM: boolean = false
    // shadowMode is open by default, and only applicable if shadowDOM is set
    // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode
    shadowMode: ShadowMode = ShadowMode.open
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
     * Set specified template variables
     */ 
    setVariables(s: string): string {
        for (var variable of this.options.variables) {
            // Replace template variables with values
            let regex = new RegExp(sprintf("{{.%s}}", variable.key), "g")
            s = s.replace(regex, variable.value)
        }
        return s
    }

    /** 
     * Insert HTML template
     */ 
    insert(template: string): ShadowRoot|null {
        let root = document.querySelector(this.options.selector) as Element
        if (root) {
            if (this.options.shadowDOM) {
                // Use shadow DOM
                root.attachShadow(<ShadowRootInit>{
                    mode: this.options.shadowMode,
                })
                root.innerHTML = template;
                // @ts-ignore
                return root
            }
    
            // Just insert the template
            root.innerHTML = template;

            // Difference between null and undefined
            // https://stackoverflow.com/a/5076962/639133
            return null
        }

        console.error(sprintf("selector not found %s", this.options.selector))
        return null
    }

    /**
     * Fetch HTML template string
     * @param path Path to the template file, or template cache key
     */
    async fetch(path: string): Promise<string> {
        let template: string
        if (config.TemplateCacheEnabled == "true") {
            // Allowing dynamic fetching of templates in prod 
            // might not a good idea due to CSP concerns, 
            // see comments for this question
            // https://stackoverflow.com/questions/36631762/returning-html-with-fetch
            if (window.app.templates) {
                return Promise.resolve(window.app.templates[path])
            } else {
                return Promise.resolve("Template cache undefined")
            }
        }
        try {
            // Fetch template dynamically from specified path
            let url = this.options.baseURL
            url.pathname = path
            let resp = await fetch(url.toString());
            template = await resp.text();
            return this.setVariables(template)
        } catch (err) {
            console.error(sprintf("load %s", path), err);
            return Promise.resolve("Error fetching template")
        }
    }

    // TODO Define interface for complete func
    /**
     * Load a template that is not defined in a tag on the page
     * @param path Path to the template file, or template cache key
     * @param complete This function is called after the template is inserted,
     *  the root param is only defined if the shadowDOM option is set
     */
    async load(path: string, complete?: (root: ShadowRoot|null) => void) {
        let template = await this.fetch(path)
        let root = this.insert(template)
        if (complete) {
            complete(root)
        }
    }
}
