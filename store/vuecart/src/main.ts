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

// Vue App
// Wait for static content to load first
// https://stackoverflow.com/a/1033448/639133
window.addEventListener("load", function () {
    Vue.config.productionTip = false
    new Vue({
        render: h => h(App),
    }).$mount('#app')
})
