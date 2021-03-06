import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import Weather from './components/Weather.vue';

const VueWeatherWidget = wrap(Vue, Weather);
window.customElements.define("vuejs-weather", VueWeatherWidget);
