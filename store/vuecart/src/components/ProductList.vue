<template>
  <div id="product-list">
    {{ foo }}
    <p>Product List {{ group }}</p>
    <ul>
      <li v-for="item in items">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Item} from "../../public/static/share/types";

interface ProductListData {
  foo: string
  items: Item[]
}

export default Vue.extend({
  name: 'ProductList',
  props: {
    // group ID might be used to fetch a group of products
    group: String,
  },
  data: (): ProductListData => {
    return {
      foo: "bar2",
      items: []
    }
  },
  methods: {
    listItems() {
      console.info("ProductList 1")
      // TODO Create type def for window.agns
      // @ts-ignore
      window.agns.store.listItems((items) => {
        console.info("ProductList 2 -")
        console.info("items", items)
        this.items = items
      })
    }
  },
  created() {
    this.listItems()
  }
});
</script>

<style scoped lang="scss">
// TODO Style below is not applied to public/index.html with `npm run serve`,
// it does apply to dist/demo.html when doing `npm run build-product-list`.
// See discussion and try solution as per this link
// https://github.com/vuejs/vue-web-component-wrapper/issues/12#issuecomment-385141573

// Default styles are scoped
// https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
// CSS Files can also be imported like this
// https://stackoverflow.com/a/43862129/639133
#product-list {
  p {
    color: #C0392B;
  }
}
</style>
