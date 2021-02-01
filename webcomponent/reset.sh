#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

# Remove tmp dirs and files created by `npm install` and `build.sh`
rm -rf ./build
rm -f ./build.index.html
rm -f ./build.port
rm -f ./lib
rm -rf ./node_modules
rm -f ./package-lock.json
rm -f ./http.ts
rm -f ./template.ts
rm -f ./pure.d.ts

