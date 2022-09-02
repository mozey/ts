#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

"${APP_DIR}"/scripts/build.sh

# TODO Check this works?
# Watcher runs in sub-shell.
# Re-build if files listed below changes,
# you still have to manually refresh the browser window.
# See https://github.com/mozey/watcher
("${GOPATH}"/bin/watcher -d 1500 -r -dir "${APP_DIR}/src" | \
  xargs -n1 bash -c "${APP_DIR}/scripts/build.sh")

# TODO Find un-used port
caddy file-server -browse -listen localhost:9999 -root "${APP_DIR}/www"
