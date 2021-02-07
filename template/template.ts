import {app} from "app"
import {Http, HttpArg, HttpDone} from "http";
import {sprintf} from "sprintf-js";

export enum ShadowMode {
    open = "open",
    closed = "closed",
}

export class TemplateOptions {
    // selector for parent element where template will be inserted
    selector: string
    // shadowDOM flag is false by default
    shadowDOM: boolean
    // shadowMode must be open if afterInsert is given
    shadowMode: ShadowMode
}

export class Template {
    options: TemplateOptions

    constructor(options?: TemplateOptions) {
        // Shallow copy
        this.options = {...options}

        // Default values
        this.options.selector = this.options.selector || "#root"
        this.options.shadowDOM = (this.options.shadowDOM == undefined)
            ? false
            : this.options.shadowDOM
        this.options.shadowMode = this.options.shadowMode || ShadowMode.open
    }

    // TODO Pass in list of additional variables with TemplateOptions?
    prepareTemplate(s: string): string {
        // Replace template variables with values as set by server
        s = s.replace(/\{\{\.Version\}\}/g, app.Version)
        return s
    }

    insert(template: string): ShadowRoot {
        if (this.options.shadowDOM) {
            // Use shadow DOM
            let root =
                $(this.options.selector)[0].attachShadow(<ShadowRootInit>{
                    mode: sprintf("%s", this.options.shadowMode),
                })
            root.innerHTML = template
            return root

        } else {
            // Just insert the template
            $(this.options.selector).html(template)
            return undefined
        }
    }

    /**
     * @param path To load template from
     * @param complete Is called after the template is inserted,
     *  root is only passed in if the shadowDOM option is set
     */
    load(path: string, complete: (root?: ShadowRoot) => void) {
        // Set version in path
        if (path.indexOf("?") === -1) {
            path = sprintf("%s?v=%s", path, app.Version)
        } else {
            path = sprintf("%s&v=%s", path, app.Version)
        }

        // TODO Load template from cache?
        // Templates can be cached in <template> tags on the current page,
        // hash path to create unique id?

        new Http(<HttpArg>{
            url: path
        }).request((resp: HttpDone[]) => {
            console.info("loading template", path)
            let template = this.prepareTemplate(resp[0].data)
            let root = this.insert(template)
            complete(root)
        })
    }
}
