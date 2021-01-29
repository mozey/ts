import AjaxSettings = JQuery.AjaxSettings;
import jqXHR = JQuery.jqXHR;
import {sprintf} from "sprintf-js";

export interface HttpArg {
    url: string
    method: string
    data: string
    settings: AjaxSettings
}

export interface HttpDone {
    data: string
    textStatus: string
    jqXHR: jqXHR
}

export interface HttpFail {
    jqXHR: jqXHR
    textStatus: string
    error: any // TODO What type should this be?
}

// Http wrapper for $.ajax request
// https://api.jquery.com/jquery.ajax
export class Http {
    static GET = "GET"
    static POST = "POST"
    // TODO Support more methods?

    readonly args: HttpArg[]

    constructor(...args: HttpArg[]) {
        this.args = args

        // Default method is GET
        this.args.forEach((arg) => {
            arg.method = arg.method || Http.GET
        })
    }

    // defaults returns the default settings for requests of type method
    static defaults(method: string): AjaxSettings {
        switch (method) {
            case Http.GET:
                return {
                    method: Http.GET,
                    // Don't automatically parse json from response
                    dataType: "text"
                }
            case Http.POST:
                return {
                    method: Http.POST,
                    // Don't automatically parse json from response
                    dataType: "text",
                    // Tell the server the request body contains a json string
                    contentType: "application/json; charset=UTF-8"
                }
            default:
                console.error(sprintf("invalid method %s", method))
                return {}
        }
    }

    /**
     * request makes one or more http requests,
     * then executes either the done or optional fail callback,
     * or the default fail callback
     * @param done
     * @param fail
     */
    request(
        done: (resp: HttpDone[]) => void,
        fail?: (resp: HttpFail[]) => void) {

        if (this.args.length === 0) {
            console.error("empty args")
            return
        }

        // One or more deferred ajax requests
        // http://michaelsoriano.com/working-with-jquerys-ajax-promises-and-deferred-objects/
        // https://stackoverflow.com/a/19614377/639133
        let requests: jqXHR[] = []

        for (let i = 0; i < this.args.length; i++) {
            let args = this.args[i]
            // Use default settings if none was passed in
            let settings = args.settings || Http.defaults(args.method)
            settings.method = args.method
            // Set data if required
            if (args.method === Http.POST) {
                settings.data = args.data || ""
            }
            requests.push($.ajax(args.url, settings))
        }

        $.when.apply($, requests)
            .done((...args: any[]) => {
                let resp: HttpDone[] = []
                if (requests.length === 1) {
                    // One request
                    resp.push(<HttpDone>{
                        data: args[0],
                        textStatus: args[1],
                        jqXHR: args[2]
                    })
                } else {
                    // Multiple requests in the queue
                    args.forEach((arg: any) => {
                        resp.push(<HttpDone>{
                            data: arg[0],
                            textStatus: arg[1],
                            jqXHR: arg[2]
                        })
                    })
                }
                done(resp)
            })
            .fail((...args: any[]) => {
                let resp: HttpFail[] = []
                if (requests.length === 1) {
                    // One request
                    resp.push(<HttpFail>{
                        jqXHR: args[0],
                        textStatus: args[1],
                        error: args[2]
                    })
                } else {
                    // Multiple requests in the queue
                    args.forEach((arg: any) => {
                        resp.push(<HttpFail>{
                            jqXHR: arg[0],
                            textStatus: arg[1],
                            error: arg[2]
                        })
                    })
                }
                if (fail) {
                    // Callback passed in, call it
                    fail(resp)
                    // ...and return
                    return
                }
                resp.forEach((resp: HttpFail) => {
                    // Note, if the dev console is open,
                    // jQuery will call console.error with message as below
                    let msg = sprintf("%s %s %s (%s)",
                        this.args[0].method, this.args[0].url,
                        resp.jqXHR.status, resp.jqXHR.statusText)

                    // Let the user know
                    $.growl.error({message: msg});
                })
            })
    }
}

