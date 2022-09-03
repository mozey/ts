import { sprintf } from "sprintf-js";
import { ResponsePOST } from "./httpbin";

// Examples inspired by 
// https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
export namespace examples {
    let baseURL = "https://httpbin.org"

    // TODO Use local containerized services?
    // setBaseURL is useful for using a locally hosted httpbin
    export function setBaseURL(s: string) {
        baseURL = s
    }

    export function post() {
        console.info("post")
        const url = sprintf("%s/post", baseURL);
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                a: 10,
                b: 20,
            }),
        };
        fetch(url, options)
            .then((response: Response) => response.json())
            .then((data: ResponsePOST) => {
                console.info(data);
            });
    }

    // TODO
    export function timeout() {
        const controller = new AbortController();
        const options = {
            method: 'POST',
            signal: controller.signal,
            body: JSON.stringify({
                firstName: 'David',
                lastName: 'Pollock'
            })
        };
        const promise = fetch('/login', options);
        // @ts-ignore
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        promise
            .then(response => { console.info(response) })
            .catch(error => console.error('timeout exceeded', error));
    }

    export function interceptor() {
    }

    export function progress() {
    }

    export function simultaneous() {
    }

}
