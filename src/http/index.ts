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

    // .........................................................................

    // HTTP POST request example
    // https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#basic-syntax
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
                setHttpbinResp(options, data)
            });
    }

    // Abort after specified timeout example
    // https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#response-timeout
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
                setHttpbinResp(options, resp)
            });
    }

    // After calling this function all calls to fetch will be logged
    // https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#HTTP-interceptors
    // Also see "Intercepting JavaScript Fetch API requests and responses"
    // https://blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses/
    export function interceptor() {
        const url = sprintf("%s/get", baseURL);

        // the global window seen by JavaScript code running within a given tab 
        // always represents the tab in which the code is running
        // https://developer.mozilla.org/en-US/docs/Web/API/Window

        const { fetch: originalFetch } = window;
        window.fetch = async (...args) => {
            let [url, config] = args;

            // START request interceptor
            console.info("Intercepted request to ", url)
            // END request interceptor

            const response = await originalFetch(url, config);

            // START response interceptor
            const json = () =>
                response
                    .clone()
                    .json()
                    .then(
                        (d: HttpbinResp) => ({
                            ...d,
                            interceptor: `Intercepted request from ${d.origin}`
                        }));
            response.json = json;
            // END response interceptor

            return response;
        };

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setHttpbinResp({}, data)
            });
    }

    export function setHttpbinResp(req: RequestInit, resp: HttpbinResp) {
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

    // .........................................................................

    // Progress indicator example
    // https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#download-progress
    export function progress() {
        const element = document.getElementById('progress') as HTMLDivElement;
        let setProgress = function ({ loaded, total }: any) {
            element.innerHTML = Math.round(loaded / total * 100) + '%';
        }

        // TODO Refactor to use httpbin instead? E.g.
        // https://httpbin.org/drip?numbytes=100&duration=5&delay=0&code=200
        fetch('https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg')
            .then(response => {
                if (response === null) {
                    return
                }
                if (!response.ok) {
                    throw Error(response.status + ' ' + response.statusText)
                }
                // ensure ReadableStream is supported
                if (!response.body) {
                    throw Error('ReadableStream not yet supported in this browser.')
                }
                // store the size of the entity-body, in bytes
                const contentLength = response.headers.get('content-length');
                // ensure contentLength is available
                if (!contentLength) {
                    throw Error('Content-Length response header unavailable');
                }
                // parse the integer into a base-10 number
                const total = parseInt(contentLength, 10);
                let loaded = 0;
                return new Response(
                    // create and return a readable stream
                    new ReadableStream({
                        start(controller) {
                            if (response.body === null) {
                                return
                            }
                            const reader = response.body.getReader();
                            read();
                            function read() {
                                reader.read().then(({ done, value }) => {
                                    if (done) {
                                        controller.close();
                                        return;
                                    }
                                    loaded += value.byteLength;
                                    setProgress({ loaded, total })
                                    controller.enqueue(value);
                                    read();
                                }).catch(error => {
                                    console.error(error);
                                    controller.error(error)
                                })
                            }
                        }
                    })
                );
            })
            .then(response => {
                console.info("response", response)
                // construct a blob from the data
                if (response == null) {
                    return
                }
                return response.blob()
            }).then(data => {
                console.info("data", data)
                if (data == null) {
                    return
                }
                // insert the downloaded image into the page
                let image = document.getElementById('img') as HTMLImageElement
                console.info("image", image, data)
                image.src = URL.createObjectURL(data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    // .........................................................................
    
    // Simultaneous requests example
    export function simultaneous() {
        var options: RequestInit = {
            headers: {
                Accept: "application/json",
            }
        }
        let url1 = 
            "https://petstore.swagger.io/v2/pet/findByStatus?status=pending"
        let url2 = 
            "https://petstore.swagger.io/v2/pet/findByStatus?status=sold"
        Promise.all([
            fetch(url1, options),
            fetch(url2, options),
        ])
            .then(async ([res1, res2]) => {
                const d1 = await res1.json()
                const d2 = await res2.json()
                console.info(d1)
                console.info(d2)
                setPetStoreResp([url1, url2], options, [d1, d2])
            })
            .catch(error => {
                console.log(error);
            });
    }

    export function setPetStoreResp(urls: string[], req: RequestInit, resp: any) {
        let reqJSON = JSON.stringify({urls: urls, req}, null, 4)
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
        form.remove()
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

    // .........................................................................

    // TODO Wrapper example

}
