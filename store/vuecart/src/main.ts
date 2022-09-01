import Vue from 'vue'
import App from './App.vue'

// Components
import wrap from '@vue/web-component-wrapper';
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const ProductListComponent = wrap(Vue, ProductList);
window.customElements.define("product-list", ProductListComponent);
const ShoppingCartComponent = wrap(Vue, ShoppingCart);
window.customElements.define("shopping-cart", ShoppingCartComponent);

// Vue App must wait for namespace to load first,
// see public/index.html
Vue.config.productionTip = false
new Vue({
    // TODO Return Promise.resolve
    // https://forum.vuejs.org/t/async-components-inside-render-function/87421/2
    render: h => {
        console.info("render")
        // Initialize the namespace
        // @ts-ignore
        window.AGNS(
            // No config overrides, just use stub server
            {},
            // Callback after namespace loaded
            function () {
                // TODO Will this work, or rather do it in main.ts render func?
                console.info("starting vue")
            })

        return h(App)
    },
}).$mount('#app')
