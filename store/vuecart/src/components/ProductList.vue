<template>
  <div id="product-list">
    <p>Product List</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProductList',
  props: {
    // group ID might be used to fetch a group of products
    group: String,
  },
});
</script>

<style scoped lang="scss">
// Default styles are scoped
// https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
// CSS Files can also be imported like this
// https://stackoverflow.com/a/43862129/639133
#app {
  p {
    color: #C0392B;
  }
}
</style>
