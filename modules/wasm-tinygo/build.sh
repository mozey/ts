#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

tinygo build -o tinygo.wasm -target wasm ./main.go

cp index.js ../../www/content/examples/wasm
cp tinygo.wasm ../../www/content/examples/wasm
cp wasm_exec.js ../../www/content/examples/wasm
