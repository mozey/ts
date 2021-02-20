#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR=${APP_DIR}

./build.sh
open build.index.html

# Re-build if files listed below changes.
# NOTE you still have to refresh the browser window
APP_DEBUG=true ${GOPATH}/bin/watcher -d 1500 -r -dir "" \
  --include ".*.ts$" \
  --excludeDir "${APP_DIR}/build.*" \
  --excludeDir "${APP_DIR}/lib.*" \
  --excludeDir "${APP_DIR}/node_modules.*" | \
  xargs -n1 bash -c "./build.sh"
