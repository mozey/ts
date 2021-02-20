#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

./down.sh
./build.sh
APP_PORT=$(cat ./build.port)
echo "Waiting for server to start..."
sleep 3
open http://localhost:${APP_PORT}/build.index.html

# Re-build if files listed below changes.
# NOTE you still have to refresh the browser window
# NOTE code inside /vuecart and /vuex is built separately
APP_DEBUG=true ${GOPATH}/bin/watcher -d 1500 -r -dir "" \
  --include ".*.go$" \
  --include ".*.ts$" \
  --excludeDir ".*/build.*" \
  --excludeDir ".*/lib.*" \
  --excludeDir ".*/node_modules.*" \
  --excludeDir ".*/vuecart.*" \
  --excludeDir ".*/vuex.*" | \
  xargs -n1 bash -c "./build.sh"
