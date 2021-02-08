<template>
  <!-- NOTE This div replace the #app div in public/index.html -->
  <div id="app">
    <HelloWorld msg="Shopping Cart Example"/>
    <img alt="Shopping Cart" src="./assets/logo.png">
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

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
#app img {
  height: 46px;
}
</style>
