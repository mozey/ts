# Simple Store Pattern

The *"stripecart"* example below demonstrates a "static e-commerce" site.
Webcomponents are used to encapsulate re-usable components. 
The [simple store pattern](https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch)
is used to share state between components and a global namespace

Inspired by the
Vuex [shopping-cart example](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart),
the [snipcart SDK](https://docs.snipcart.com/v3/sdk/basics),

Implemented with VueJS and TypeScript


## Vuex examples

Consider these examples for reference,
run the commands below, 
then click the "Shopping Cart" link

```
cd ts/store
git clone https://github.com/vuejs/vuex
cd vuex
npm install
npm run dev
open http://localhost:8080
```


## VueJS v2 Hello World

Consider a minimal VueJS v2 example, 
[Hello World](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-hello-world?file=/index.html).
Here is an offline equivalent of the codesandbox link
```
open hellovue.html
```


## stripecart

Usually an e-commerce website consists of the following
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

Build and open the example
```
./build.sh
APP_PORT=$(cat ./static/build.port) && open http://localhost:${APP_PORT}
```


### Stub server for Stripe API

A [stub server](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs),
modelled on [Stripe Products API](https://stripe.com/docs/api/products),
is used to read stub files from `stripe/v1`

Run `build.sh` as per the instruction above to start the server.
Currently, only the three endpoints listed below are implemented.
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


### Web components

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
npm run build
```

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


### Static pages

**TODO** Same example as above, but only hits the `/v1/orders` API.
Product data is loaded statically from the page


