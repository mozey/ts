#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

if [[ ! -d node_modules ]]; then
  echo "Installing node modules..."
  npm install
fi

if [[ ! -e lib ]]; then
  echo "Creating lib symlink..."
  ln -s ../http/lib lib
fi

if [[ ! -e src ]]; then
  echo "Creating src dir..."
  mkdir src
  cp ../http/http.ts src
#  cp ../template/template.ts src
  echo "Types def for PureJS..."
  cp ../template/pure.d.ts src
fi

echo "Compiling typescript..."
tsc

echo "Building index..."
TimestampS=$(date +"%s")
sed "s/{{.Version}}/${TimestampS}/g" index.html > build.index.html

