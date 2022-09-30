# preact

## Quick start 

Preview
```bash
cd modules/preact
cd my-widget
npm install
npm run dev
```

Build *"your component as a Preact component library"*. Do this if you want to use the component in a Preact web application
```bash
# npm run build:lib
```

Build *"your widget to be consumed by other <s>Preact</s> web applications"*. Do this to include the component on any page
```bash
npm run build:widget
cp dist/index.umd.js ../../../www/content/examples/preact/dist/index.js
```

See [what are UMD modules?](https://jameshfisher.com/2020/10/04/what-are-umd-modules/)

TODO Use ES Module?


## Setup

Use the `preact-cli` to setup a new project from the template [widget-typescript](https://github.com/preactjs-templates/widget-typescript)
```bash
cd modules/preact
npx preact-cli create widget-typescript my-widget
cd my-widget
npm install
npm run dev
```

Confusingly, the `habitat` module used by the widget-typescript template, is not mentioned in the docs? See [PreactJS web component](https://preactjs.com/guide/v10/web-components)  

