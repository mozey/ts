// import Alpine from 'alpinejs'
import { sprintf } from "sprintf-js";
import { HttpbinResp } from "./models/httpbin";
import { Animal } from "./models/animal";

// Examples inspired by 
// https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
export namespace index {
    let baseURL = "https://httpbin.org"

    // TODO Use local containerized services?
    // setBaseURL is useful for using a locally hosted httpbin
    export function setBaseURL(s: string) {
        baseURL = s
    }

    export function sayHello() {
        console.info("Hello!")
    }

    export function post() {
        const url = sprintf("%s/post", baseURL);

        let a1: Animal = {
            name: "mouse",
            food: "cheese"
        }
        let a2: Animal = {
            name: "bird",
            food: "seed"
        }
        let animals: Animal[] = [a1, a2]

        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(animals),
        };
        fetch(url, options)
            .then((response: Response) => response.json())
            .then((data: HttpbinResp) => {
                let animals = data.json as Animal[]
                console.info("Typed data enables IDE completion")
                console.info("name =>", animals[0].name)
                console.info("food =>", animals[0].food)
                setResults(options, data)
            });
    }

    export function timeout() {
        const url = sprintf("%s/delay/1", baseURL);
        const controller = new AbortController();
        const options = {
            method: 'POST',
            signal: controller.signal,
            body: JSON.stringify({
                name: "squirrel",
                food: "nuts"
            } as Animal)
        };
        const promise = fetch(url, options);
        // const timeoutId = setTimeout(() => controller.abort(), 4000);
        setTimeout(() => controller.abort(), 500);
        promise
            .then(response => { 
                console.info(response) 
                alert("Oops, response didn't timeout?")
            })
            .catch((error: string) => {
                let msg = sprintf("timeout exceeded => %s", error)
                console.error(msg)
                let resp: HttpbinResp = {
                    url: url,
                    data: msg
                }
                setResults(options, resp)
            });
    }

    export function interceptor() {
    }

    export function progress() {
    }

    export function simultaneous() {
    }

    // setResults of the HTTP request
    export function setResults(req: RequestInit, resp: HttpbinResp) {
        let reqJSON = JSON.stringify(req, null, 4)
        let respJSON = JSON.stringify(resp, null, 4)
        
        // Clone
        let panel =
            document.getElementById("results-template") as HTMLTemplateElement
        let clone = panel.content.cloneNode(true) as HTMLDivElement

        // Append template
        let results = document.getElementById("results") as HTMLDivElement
        results.textContent = ""
        results.appendChild(clone)

        // Set template values...
        // Link form
        let form = results.getElementsByClassName("x-app-url")[0] as
            HTMLFormElement
        form.action = resp.url
        form.method = req.method as string
        let link = form.getElementsByTagName("a")[0] as HTMLAnchorElement
        link.textContent = resp.url
        // Req
        let reqElem = results.getElementsByClassName("x-app-req")[0] as
            HTMLPreElement
        reqElem.innerText = reqJSON
        // Resp
        let respElem = 
            results.getElementsByClassName("x-app-resp")[0] as
            HTMLPreElement
        respElem.innerText = respJSON
    }
}
