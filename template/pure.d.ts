// "If a Javascript library is present in the page...
// pure.js will automatically extend it with the methods described below"
// https://pure-js.com/
//
// Define pure.js methods here otherwise the TypeScript compiler complains
//
interface JQuery {
    compile(directive: object): (data: object) => string

    render(data: object, directive: object): void;
}
