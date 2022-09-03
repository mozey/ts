export class Examples {
    async run() {
        console.log("running...")
        // TODO See ts/http/app.ts

        // Example as per https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
        const url = "https://jsonplaceholder.typicode.com/todos";
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
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }
}
