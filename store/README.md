# Simple Store Pattern

The *"stripecart"* example below demonstrates state sharing like the 
[Vuex](https://vuex.vuejs.org/) 
[shopping-cart example](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart),
but using the [simple store pattern](https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch)
and webcomponents.
Inspired by the [snipcart SDK](https://docs.snipcart.com/v3/sdk/basics),
implemented in TypeScript


## Vuex examples

Run the vuex examples as below, and click the "Shopping Cart" link  
```
cd ts/store
git clone https://github.com/vuejs/vuex
cd vuex
npm install
npm run dev
open http://localhost:8080
```


## VueJS v2 Hello World

Also consider a minimal VueJS v2 example, 
[Hello World](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-hello-world?file=/index.html).
Here is an offline equivalent of the codesandbox link
```
open hello_vue.html
```


## stripecart

Usually an e-commerce website will have the following components
- Web (and or app) user interface
- Inventory management
- Payment processing
- Fulfillment

For this example,
inventory management is done directly on the payment processor.
The example products are downloads and subscriptions,
therefore fulfillment is also not applicable.

With minor modification you could use this example as a base to build a 
user registration page with subscription and recurring invoices,
i.e. [billing](https://stripe.com/billing)

Run the TypeScript store example, and click the `build.index.html` link
```
./build.sh
APP_PORT=$(cat ./build.port) && open http://localhost:${APP_PORT}/build.index.html
```


### Stub server for Stripe API

A [stub server](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs), 
structured similar to the  
[Stripe Products API](https://stripe.com/docs/api/products), is used

Run the `build.sh` command as per the instruction above to start the server.
For this simple example only the three endpoints listed below are implemented.
Note that products and prices share a common "product" ID 

```
APP_PORT=$(cat ./build.port)

http http://localhost:${APP_PORT}/v1/products
http http://localhost:${APP_PORT}/v1/prices

# POST orders endpoint doesn't do anyting, 
echo '{"a": 1}' | http POST http://localhost:${APP_PORT}/v1/orders
```

View server logs in tmux

    tmux ls
    tmux a -t mozey-ts-store

To stop the server run `./down.sh`


### Watcher

Run a watcher to rebuild when source files are changed

    ./watch.sh


### Shopping cart web components

#### Product List

Aims to be similar to this 
[vuex example](https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/components/ProductList.vue),
see `vuecart/src/components/ProductList.vue`

#### Shopping Cart

Aims to be similar to this 
[vuex example](https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/components/ShoppingCart.vue),
see `vuecart/src/components/ShoppingCart.vue`

#### Setup

Follows the same approach as this 
[weather component](https://github.com/mozey/ts/tree/main/webcomponent/vuejs/weather) 

Create a project with vue/cli,
see [using TypeScript with Vue](https://archive.is/nwkWV)
```
cd ts/store/vuecart

vue create vuecart
# ? Please pick a preset
# > Manually select features
# (unselect others and only select the features below)
# o TypeScript 
# o CSS Pre-processors 
# ? Use class-style component syntax? (Y/n) n
# ? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (y/N) n
# ? Pick a CSS pre-processor
# > Sass/SCSS (with node-sass)
# ? Where do you prefer placing config...
# > In package.json
# ? Save this as a preset for future projects? (y/N) n 
```

Install [web component wrapper](https://github.com/vuejs/vue-web-component-wrapper)
```
cd vuecart
npm install --save @vue/web-component-wrapper
```

NOTE A type definition file, see `src/web-component-wrapper.d.ts`, 
is required otherwise the npm build will fail with
```
Could not find a declaration file for module '@vue/web-component-wrapper'...
@vue/web-component-wrapper/dist/vue-wc-wrapper.js' implicitly has an 'any' type.
```

Preview web components with **dev** server
```
cd vuecart
npm run serve
open http://localhost:8080
```

For **prod**,
*"...create a build that is optimized for deployment and does not include 
the core vue library. The rationale is that there can typically be multiple 
web components on a website and packaging the Vue library with every instance 
would be a waste of resources."*, update `package.json` to `--target wc` then
```
cd vuecart
npm run build
```

**TODO** 
- Why is component styling applied for `App.vue`,
but not for `HelloWorld.`, `ShoppingCart.vue`, etc?  
- AGNS (pronounced Agnes?), is the App Global Name Space. 
It must make it easy to swap out components built in other frameworks 
(e.g. Angular or React). Revise `window.AGNSInit`
- Make vuecart components use AGNS
