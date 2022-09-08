import { sprintf } from "sprintf-js"

export enum ShadowMode {
    open = "open",
    closed = "closed",
}

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
    // variables to set before template is appended
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

    // Set specified template variables
    setVariables(s: string): string {
        for (var variable of this.options.variables) {
            // Replace template variables with values
            let regex = new RegExp(sprintf("{{.%s}}", variable.key), "g")
            s = s.replace(regex, variable.value)
        }
        return s
    }

    insert(template: string): ShadowRoot|null {
        let root = document.querySelector(this.options.selector) as Element
        if (root) {
            if (this.options.shadowDOM) {
                // Use shadow DOM
                root.attachShadow(<ShadowRootInit>{
                    mode: sprintf("%s", this.options.shadowMode),
                })
                root.innerHTML = template;
                // @ts-ignore
                return root
            }
    
            // Just insert the template
            root.innerHTML = template;
            return null
        }

        console.error(sprintf("selector not found %s", this.options.selector))
        return null
    }

    /**
     * @param path To load template from
     * @param complete Is called after the template is inserted,
     * root is only defined if the shadowDOM option is set
     */
    async load(path: string, complete?: (root: ShadowRoot|null) => void) {
        try {
            let url = this.options.baseURL
            url.pathname = path
            // TODO Option load templates from "app.cache" only.
            // Allowing dynamic loading of templates in prod 
            // probably not a good idea due to CSP concerns?
            // See comments for this question
            // https://stackoverflow.com/questions/36631762/returning-html-with-fetch
            let resp = await fetch(url.toString());
            let raw = await resp.text();
            let template = this.setVariables(raw)
            let root = this.insert(template)
            if (complete) {
                complete(root)
            }

        } catch (err) {
            console.error(sprintf("load %s", path), err);
        }
    }
}
