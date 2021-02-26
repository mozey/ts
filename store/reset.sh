#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

# Remove tmp dirs and files created by `npm install` and `build.sh`
rm -f ./lib
#rm -rf ./node_modules
rm -f ./openport.sh
#rm -f ./package-lock.json
rm -rf ./static/build
rm -f ./static/build.index.html
rm -f ./static/build.port

