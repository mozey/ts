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

**TODO** Create a list of examples for TypeScript 
similar to [Go by Example](https://gobyexample.com/)


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

Web components use [Shadow DOM](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom)
to encapsulate a widget's DOM tree from the rest of the page. Not to be confused 
with Virtual DOM, a performance optimization technique where a copy of the UI is 
kept in memory and occasionally synced with what the user sees 

More info on [using the shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

Older browsers version not supporting Shadow DOM can use the
[webcomponentsjs polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)


