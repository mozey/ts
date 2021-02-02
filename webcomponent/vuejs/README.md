VueJS weather widget,
see [Get started with Vue web components](https://archive.is/OKA7l)

Uses [this locationforecast API](https://api.met.no/weatherapi/locationforecast/2.0), for example
```
http "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=-33.947032&lon=18.377848"
```

Create a project with vue/cli,
see [using TypeScript with Vue](https://archive.is/nwkWV)
```
cd ts/webcomponent/vuejs

vue create weather
# ? Please pick a preset
# > Manually select features
# o TypeScript (unselect others and only select this feature)
# ? Use class-style component syntax? (Y/n) n
# ? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (y/N) n
# ? Where do you prefer placing config...
# > In package.json
# ? Save this as a preset for future projects? (y/N) n 
```

Install [web component wrapper](https://github.com/vuejs/vue-web-component-wrapper)
```
cd weather
npm install --save @vue/web-component-wrapper
```

The weather
[single file vue component](https://vuejs.org/v2/guide/single-file-components.html), 
is at `ts/webcomponent/vuejs/weather/src/components/Weather.vue`
Wrap the vue component to make it a web component, 
this is done in `src/main.ts` e.g. 
```
import Weather from './components/Weather';
const VueWeatherWidget = wrap(Vue, Weather);
window.customElements.define("vuejs-weather", VueWeatherWidget);
```

Similar to the "get started" link above,
edit `public/index.html` to use the custom component `<vuejs-weather>`,

Preview widget with **dev** server
```
npm run serve
open http://localhost:8080
```

For **prod**,
*"...create a build that is optimized for deployment and does not include 
the core vue library. The rationale is that there can typically be multiple 
web components on a website and packaging the Vue library with every instance 
would be a waste of resources."*,
update `package.json` to use `vue-cli-service build --target wc` and then
```
npm run build
open dist/demo.html
```

See "get started" link above for
- Inspect the results
- Style your component
- Applying styles in development

**TODO** How to apply style sheets included outside `#shadow-root (open)`?
For example, the end user includes `vue-weather-widget.js` with default styles.
How to override with user styles in `vue-weather-widget-custom.css`?




