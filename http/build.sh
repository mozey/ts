#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

clear

if [[ ! -d node_modules ]]; then
  echo "Installing node modules..."
  npm install
fi

echo "Compiling typescript..."
tsc

echo "Building index..."
TimestampS=$(date +"%s")
sed "s/{{.Version}}/${TimestampS}/g" index.html > build.index.html

echo "done `basename $0`"