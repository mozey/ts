# Svelte

Svelte examples

Svelte Components are not the same as Web Components. [Differences](https://archive.ph/kHQ9P) include
- Naming convention, Svelte uses `<PascalCase>`, while web component use `<kebab-case>`
- Svelte props types include strings, numbers, and objects, while web component props only accept strings (use `JSON.stringify` to pass complex values)
- Svelte components scope their CSS, but they do not live in shadow DOM?
- Events are handled differently
- etc?


## demo

Created with [svelte-web-components-template](https://github.com/sinedied/svelte-web-components-template)

Install
```bash
cd www/examples/svelte/demo
```

Build
```bash
npm run build
```


### Setup from scratch

Create a new project
```bash
cd www/examples/svelte
npx degit sinedied/svelte-web-components-template#main demo
cd demo
npm install # or yarn
```

Start dev server
```bash
npm run dev
```


