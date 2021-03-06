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

// @ts-ignore
window.START_VUE = () => {
    // Vue App must wait for namespace to load first,
    // see public/index.html
    Vue.config.productionTip = false
    new Vue({
        render: h => h(App),
    }).$mount('#app')
}
