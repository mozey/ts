// import Alpine from 'alpinejs'
import { sprintf } from "sprintf-js";
import { HttpbinResp } from "./models/httpbin";
import { Animal } from "./models/animal";

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
                console.info("name", animals[0].name)
                console.info("food", animals[0].food)
                setResults(options, data)
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

    // setResults of the HTTP request
    export function setResults(req: RequestInit, resp: HttpbinResp) {
        let reqJSON = JSON.stringify(req, null, 4)
        let respJSON = JSON.stringify(resp, null, 4)
        let panel = document.getElementsByTagName("template")[0];
        let clone = panel.content.cloneNode(true)
        let results = document.getElementById("results")
        if (results !== null) {
            results.textContent = ""
            results.appendChild(clone)
            results.getElementsByTagName("pre")[0].innerText = reqJSON
            results.getElementsByTagName("pre")[1].innerText = respJSON
        }
    }
}
