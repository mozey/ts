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

if [[ ! -e pure.d.ts ]]; then
  echo "Copying src..."
  cp ../http/http.ts ./
  cp ../template/template.ts ./
  cp ../template/pure.d.ts ./
fi

echo "Compiling typescript..."
tsc

echo "Building index..."
APP_NAME="mozey-ts-webcomponent"
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
  # TODO "duplicate session: mozey-ts-webcomponent" but only sometimes, why?
  sleep 1
fi
tmux new -d -s ${APP_NAME}
tmux send -t ${APP_NAME} "APP_DIR=${APP_DIR} APP_PORT=${APP_PORT} go run server.go" ENTER


