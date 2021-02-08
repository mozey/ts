### weather

VueJS weather widget,
see [get started with Vue web components](https://archive.is/OKA7l)

Uses the yr.no 
[locationforecast API](https://api.met.no/weatherapi/locationforecast/2.0), 
for example
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

NOTE A type definition file, see `src/web-component-wrapper.d.ts`, 
is required otherwise the npm build will fail with
```
Could not find a declaration file for module '@vue/web-component-wrapper'...
@vue/web-component-wrapper/dist/vue-wc-wrapper.js' implicitly has an 'any' type.
```

Install [axios](https://github.com/axios/axios) HTTP request library
```
npm install --save axios
```

The weather
[single file vue component](https://vuejs.org/v2/guide/single-file-components.html), 
is at `ts/webcomponent/vuejs/weather/src/components/Weather.vue`
Wrap the vue component to make it a web component, 
see `src/main.ts`

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
would be a waste of resources."*, update `package.json` to `--target wc` then
```
npm run build
```

Version dist files for `webcomponent/index2.html`
```
cp dist/vuejs-weather.js dist-vuejs-weather.js
cp dist/vuejs-weather.js.map dist-vuejs-weather.js.map
```

Edit `disc/demo.html` to set props, e.g.
```
<vuejs-weather msg="VueJS Weather Widget"
               lat="-33.947032" lon="18.377848"></vuejs-weather>
``` 

View the demo 
```
open dist/demo.html
```

See "get started" link above for
- Inspect the results
- Style your component
- Applying styles in development

**TODO** How to apply style sheets included outside `#shadow-root (open)`?
For example, the end user includes `vue-weather-widget.js` with default styles.
How to override with user styles in `vue-weather-widget-custom.css`?




