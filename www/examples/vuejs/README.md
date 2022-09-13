# VueJS

VueJS examples

## weather

VueJS weather widget, see [get started with VueJS web components](https://archive.is/OKA7l)

Uses the [YR](http://yr.no) [location forecast API](https://api.met.no/weatherapi/locationforecast/2.0), for example
```bash
curlie "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=-33.947032&lon=18.377848"
```

### Quick start

Preview widget with **dev** server
```bash
cd www/examples/vuejs/weather
npm install
du -sh node_modules
# 188M
npm run serve
open http://localhost:8080
```

For **prod**, "...create a build that is optimized for deployment and does not include the core Vue library. The rationale is that there can typically be multiple web components on a website and packaging the Vue library with every instance would be a waste of resources.", update `package.json` to `--target wc` then
```bash
npm run build
ls dist
# dist/vuejs-weather.js
# dist/vuejs-weather.js.map
```

Similar to the "get started" link above, use the custom component by including
on the page 
- distribution scripts listed above
- the `<vuejs-weather>` custom tag

The custom tag also support some "props", for example
```bash
<vuejs-weather msg="VueJS Weather Widget"
               lat="-33.947032" lon="18.377848"></vuejs-weather>
``` 

Also see "get started" link above for more info on
- Inspecting the results
- Styling your components
- Applying styles in development


### Setup from scratch

Create a project with `vue/cli`, see [using TypeScript with VueJS](https://archive.is/nwkWV)
```bash
cd www/examples/vuejs
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
```bash
cd weather
npm install --save @vue/web-component-wrapper
```

Type definition file, see `src/web-component-wrapper.d.ts`, is required otherwise the npm build will fail with
```bash
#Could not find a declaration file for module '@vue/web-component-wrapper'...@vue/web-component-wrapper/dist/vue-wc-wrapper.js' implicitly has an 'any' type.
```

Install [axios](https://github.com/axios/axios) HTTP request library
```bash
npm install --save axios
```

The weather [single file VueJS component](https://vuejs.org/v2/guide/single-file-components.html), is at `vuejs/weather/src/components/Weather.vue`. Wrap the VueJS component to make it a web component, see `src/main.ts`



