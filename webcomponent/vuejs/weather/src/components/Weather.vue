<template>
  <div>
    <div>{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Weather',
  props: {
    msg: String,
  },
});
</script>

