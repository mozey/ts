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

<!--
NOTE Do not use scoped CSS, and do not use component styles
https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
The idea is that developer using these component can override default styles
by including a single .css file on the index page similar to `vuecart.js`.
For example, see `public/index.html` and `assets/logo.png`.

-->
<style></style>

<!-- Include styles like this instead -->
<link rel="stylesheet" href="vuecart.css">