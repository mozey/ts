<template>
  <!-- NOTE This div replaces the #app div in public/index.html -->
  <div id="app">
    <h3>{{ header }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: function () {
    return {
      // NOTE Users doesn't have to use window.AGNS_DATA
      header: "VueCart Example",
    }
  },
  components: {
    // Example keeps it simple, however,
    // user are not prevented from including custom components in their apps
  }
});
</script>

<style lang="scss">
// Keeping in mind recent rules on breaking encapsulation,
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
