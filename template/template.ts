import {app} from "app"
import {Http, HttpArg, HttpDone} from "./src/http";
import {sprintf} from "sprintf-js";

export class Template {
    prepareTemplate(s: string): string {
        // Replace template variables with values as set by server
        s = s.replace(/\{\{\.Version\}\}/g, app.Version)
        return s
    }

    load(path: string, complete: () => void) {
        // Set version in path
        if (path.indexOf("?") === -1) {
            path = sprintf("%s?v=%s", path, app.Version)
        } else {
            path = sprintf("%s&v=%s", path, app.Version)
        }

        // TODO Load template from cache?

        new Http(<HttpArg>{
            url: path
        }).request((resp: HttpDone[]) => {
            console.info("loading template", path)
            let s = app.template.prepareTemplate(resp[0].data)
            $("div#root").html(s)
            complete()
        })
    }
}
