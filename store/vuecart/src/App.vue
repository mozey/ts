<template>
  <!-- NOTE This div replace the #app div in public/index.html -->
  <div id="app">
    <HelloWorld msg="Shopping Cart Example 🛒"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  }
});
</script>

<style lang="scss">
// Keeping in recent rules on breaking encapsulation
// "::shadow and /deep/ were removed for breaking encapsulation",
// means it's not possible to include a global `app.css` to style components
// https://stackoverflow.com/a/35833779/639133
// More info on styling components here
// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_styling
#app {
  text-align: center;
  color: darkgreen;
  margin-top: 20px;
}
#app img {
  height: 46px;
}
</style>
