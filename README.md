# ts

Misc TypeScript examples and libs 

This repo is framework agnostic, and tries to think of dependencies as libraries. That said, some frameworks can be used like libraries, see for example [using VueJS as a general purpose library](https://blog.logrocket.com/use-vue-js-general-purpose-javascript-library).

Consider the following quote re. [frameworks vs libraries](https://martinfowler.com/bliki/InversionOfControl.html) *"Inversion of Control is a key part of what makes a framework different to a library. A **library** is essentially a set of functions that you can call, these days usually organized into classes. Each call does some work and returns control to the client... A **framework** embodies some abstract design, with more behavior built in. In order to use it you need to insert your behavior into various places in the framework either by sub-classing or by plugging in your own classes. The framework's code then calls your code at these points."*.

The ability to easily inspect and understand the [DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp), and instant visual feedback, is an important part of what makes programming the browser fun. Many modern frameworks make it very hard for the user to understand the rendered page source by wrapping it in layers of metadata tags. Or, using techniques like [Virtual DOM (is pure overhead)](https://svelte.dev/blog/virtual-dom-is-pure-overhead).

The [TypeScript](https://www.typescriptlang.org/) compiler is used for static code analysis, see [scripts/build.sh](https://github.com/mozey/ts/blob/main/scripts/build.sh).

Bundling is done with [esbuild](https://esbuild.github.io/): *"current build tools for the web are 10-100x slower than they could be. The main goal of the esbuild bundler project is to bring about a new era of build tool performance, and create an easy-to-use modern bundler along the way"*.

The application is organized like a static site using folders and files, instead of using [push state routing](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) i.e. [SPA](https://en.wikipedia.org/wiki/Single-page_application). Each page imports the same bundled `dist/app.js` and `app.css`, there is no [code splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting). 

This approach encourages using production tools, like [hugo](https://gohugo.io/) (static site generator), and [Caddy](https://caddyserver.com/) (file server), in the development environment too.

Pages can use [AlpineJS](https://alpinejs.dev/) syntax for composing behavior directly in the markup, or access more complex logic via the `window.app` namespace. The `windows.alpine` global is made available to improve [DX](https://en.wikipedia.org/wiki/User_experience#Developer_experience). Additional JavaScript code can easily be included inline, or imported from external files, with [script tags](https://www.w3schools.com/tags/tag_script.asp)


## Demo

Clone the repo
```bash
git clone https://github.com/mozey/ts.git
cd ts
```

Configure environment variables
```bash
# Copy `sample.env` to `.env` and tweak values as required
cp sample.env .env
# Export environment variables
export $(grep -v '^#' .env | xargs)
```

Build src and start Caddy static file server
```bash
APP_DIR=$(pwd) ./scripts/up.sh
```

Open the index page in your browser and browse the examples


<hr/>

**TODO** Refactor examples listed below

## datepicker

Simple datepicker using `<select>` tags.
Works great on mobile browsers

Build, run and reset works the same as the previous examples

**TODO** Move to [dropaday](https://github.com/mozey/dropaday)?


## webcomponent

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
```bash
./build.sh
```

### Web Component Example 1

Load and render template into a div (with shadow DOM), set heading using a 
[slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
```bash
APP_PORT=$(cat ./build.port) && open http://localhost:${APP_PORT}/build.index.html
```

### Web Component Example 2

VueJS single file component wrapped as a custom element.

This example uses the pre-built `vuejs/weather/dist-vuejs-weather.js` widget,
To make sense of the source code in `vuejs/weather` see the
[README](https://github.com/mozey/ts/tree/main/webcomponent/vuejs)
```bash
open index2.html
``` 

## [store](https://github.com/mozey/ts/tree/main/store) 

State sharing using a simple store pattern 


