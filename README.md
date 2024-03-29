**TODO** Use similar theme to https://www.mozey.co/

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

Use native Javascript methods wherever possible, see for example [You Don't Need LoDash Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore). Most modern browsers support these methods natively, and for those that don't there is [es5-shim](https://github.com/es-shims/es5-shim)


## [Demo](https://mozey.co/demo/ts)

### Dev

Clone the repo
```bash
git clone https://github.com/mozey/ts.git
cd ts
```

Configure environment variables for dev
```bash
# Create env file for dev config, tweak values as required
cp sample.env .env
# Export environment variables
export $(grep -v '^#' .env | xargs)
```

Build src and start Caddy static file server
```bash
APP_DIR=$(pwd) ./up.sh
```

Open the index page in your browser to see the examples


## Deploy

Create env file for prod config from sample
```bash
cp sample.prod.env prod.env
```

Deploy static site to S3. Using [mozey/config](https://github.com/mozey/config) to set env variables, it's not required, the method described above also works
```bash
# Config
conf prod
# Stop dev server if it's running
./down
# Deploy
./scripts/deploy.sh
```


## Theme

Using [bulma](https://bulma.io/documentation/) 

### Icons

Using [material design icons](https://materialdesignicons.com/)

Only the SVG icons that are used are versioned in this repo. Copy icons to the [static dir](https://gohugo.io/content-management/static-files/) to version them
```bash
# The clone path is ignored
git clone https://github.com/mozey/MaterialDesign-SVG ~/MaterialDesign-SVG
# Version the github icon
cp ~/MaterialDesign-SVG/svg/github.svg www/themes/ts/static/icons
```


## TODO

Version exported `issues.md` in this repo, see private repo [ts-issues](https://github.com/mozey/ts-issues)

