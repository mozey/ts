State sharing like the [Vuex](https://vuex.vuejs.org/) 
[shopping-cart example](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart),
but using the [simple store pattern](https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch),
inspired by the [snipcart SDK](https://docs.snipcart.com/v3/sdk/basics),
implemented in TypeScript

Run the original vuex example
```
cd ts/store
git clone https://github.com/vuejs/vuex
cd vuex
npm install
npm run dev
```

Also consider the most minimal VueJS v2 example, 
[Hello World](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-hello-world?file=/index.html).
Here is an offline equivalent of the codesandbox link
```
open hello_vue.html
```

This example uses a stub server, structured similar to the  
[Stripe Products API](https://stripe.com/docs/api/products)

Run the TypeScript store example, and click the `build.index.html` link
```
./buid.sh
APP_PORT=$(cat ./build.port) && open http://localhost:${APP_PORT}/build.index.html
```
