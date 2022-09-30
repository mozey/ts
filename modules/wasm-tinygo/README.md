# wasm-tinygo

See TinyGo guide to [using WebAssembly](https://tinygo.org/docs/guides/webassembly/)


## Quick start

Build
```bash
cd modules/wasm-tinygo
./build.sh
```

View example [localhost](http://localhost:9999/examples/wasm/)

TODO Source map for `tinygo.wasm`?

TODO Create Go dev server as per TinyGo guide for better DX

TODO Convert `index.js` to TypeScript and move to `src/wasm`


## Setup

[Install TinyGo](https://tinygo.org/getting-started/install/macos/)
```bash
brew tap tinygo-org/tools
brew install tinygo
tinygo version
```

Download helper functions for installed version of tinygo
```bash
curlie -o wasm_exec.js https://raw.githubusercontent.com/tinygo-org/tinygo/v0.25.0/targets/wasm_exec.js
```

