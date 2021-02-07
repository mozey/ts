#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

if [[ ! -e lib ]]; then
  echo "Creating lib symlink..."
  ln -s ../http/lib lib
fi

if [[ ! -e openport.sh ]]; then
  echo "Copying src..."
  cp ../webcomponent/openport.sh ./
fi

echo "Compiling typescript..."
tsc

# NOTE It is possible to build everything as a VueJS app with webpack.
# However, this example attempts to build a generic store
# that might be used with other JS frameworks too, e.g. React, Angular.
# Therefore the end result of this build can be included as a separate script,
# at the cost of 18KB extra for the minified module loader
echo "Bundling module loader with build..."
rm -f build/agns.js
cat lib/require-2.3.6.min.js > build/agns.js
echo "" >> build/agns.js
cat build/agns.module.js >> build/agns.js

echo "Building index..."
APP_NAME="mozey-ts-store"
APP_DIR=$(pwd)
if [[ ! -e build.port ]]; then
  # Choose random open port
  APP_PORT=$(./openport.sh)
else
  # Use port as per previous build,
  # enables hitting refresh button on browser after building
  APP_PORT=$(cat ./build.port)
fi
APP_VERSION=$(date +"%s")
sed "s/{{.Port}}/${APP_PORT}/g" index.html |
sed "s/{{.Version}}/${APP_VERSION}/g" > build.index.html
echo ${APP_PORT} > build.port

echo "(Re)starting server on localhost:${APP_PORT}..."
if tmux has-session -t ${APP_NAME} 2>/dev/null; then
  ./down.sh
  sleep 1
fi
tmux new -d -s ${APP_NAME}
tmux send -t ${APP_NAME} "APP_DIR=${APP_DIR} APP_PORT=${APP_PORT} go run server.go" ENTER


