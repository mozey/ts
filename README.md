# ts

Misc Typescript examples and libs 


## Usage

To run the libs and examples first clone this repo,
then follow the instructions below 

**NOTE** npm is only used for **type definitions** to help with IDE completion.
This keeps the size on disk of `node_modules` to a bare minimum 

This repo is self-contained and must not rely on code inside of `node_modules`.
Eventually the examples might make use of 
[deno imports](https://deno.land/manual/examples/import_export)

This repo is framework agnostic, instead think of dependencies as libraries.
That said, some frameworks can easily be used like libraries, 
without them trying to take over everything. See for example 
[using Vue.js as a general purpose library](https://blog.logrocket.com/use-vue-js-general-purpose-javascript-library)
or [AlpineJS](https://github.com/alpinejs/alpine)
What is the closest you can get to **"just use TypeScript"**?

Lastly, [consider this](https://w3techs.com/technologies/details/js-jquery)
*"jQuery is used by 96.0% of all the websites whose JavaScript library we know. 
This is 77.4% of all websites."*


## Examples

**TODO** Inside `ts/examples` create a list of examples for TypeScript 
similar to [Go by Example](https://gobyexample.com/)

Examples might also have a corresponding TS lib for re-use in other projects.


## Libs

### http

Example of doing [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
a.k.a. [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX)  

Makes use of the [jqXHR](https://api.jquery.com/jquery.ajax) wrapper 
around the browsers native XMLHttpRequest object, and 
[jquery-growl](https://github.com/ksylvest/jquery-growl) for messaging the user

Build

    cd ts/http
    ./build.sh
    
Open the index file in your default browser to run the example.
It will make some requests to [httpbin](https://httpbin.org)
and display the results

    open build.index.html

Make some change, run `build.sh` again, 
and click the browser refresh button to see the results

Watch and rebuild when files are changed,
you still have to refresh the browser window

    APP_DIR=$(pwd) ./watch.sh


### template

Basic template loader and cache, makes use of the `http` lib described above.

Note that `build.sh` creates a symlink to `ts/http/lib` (JavaScript files),
and copies TypeScript libraries to `ts/template/src`.
The latter are included by `tsconfig.json` and compiled to `build/app.js` 

Build

    cd ts/template
    ./build.sh
 
Run

    open build.index.html
    
Reset to remove build artifacts

    ./reset.sh
   
   
### datepicker

Simple datepicker using `<select>` tags.
Works great on mobile browsers

Build, run and reset works the same as the previous examples


### webcomponent

Web components use [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom)
to encapsulate a widget's DOM tree from the rest of the page.
This is useful to prevent issues like
- Duplicate DOM element IDs
- JS namespace clashes
- CSS leaking
- etc?

Shadow DOM is not to be confused with Virtual DOM, a performance optimization 
technique where a copy of the UI is kept in memory and occasionally synced 
with what the user sees. 

More info on 
[using custom elements](https://developers.google.com/web/fundamentals/web-components/customelements),
and here is a tutorial on 
[understanding the Shadow DOM](https://blog.logrocket.com/understanding-shadow-dom-v1-fa9b81ebe3ac)

Older browser versions not supporting Shadow DOM can use the
[webcomponentsjs polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)

Build

    ./build.sh
    
#### Web Component Example 1

Load and render template into a div (with shadow DOM), set heading using a 
[slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)

    APP_PORT=$(cat ./build.port) && open http://localhost:${APP_PORT}/build.index.html

#### Web Component Example 2

VueJS single file component wrapped as a custom element.

This example uses the pre-built `vuejs/weather/dist-vuejs-weather.js` widget,
To make sense of the source code in `vuejs/weather` see the
[README](https://github.com/mozey/ts/tree/main/webcomponent/vuejs)

    open index2.html
    

### [store](https://github.com/mozey/ts/tree/main/store) 

State sharing using a simple store pattern 


