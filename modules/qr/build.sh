#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR=${APP_DIR}
cp "${APP_DIR}/modules/qr/dist/qr.png" ../../www/content/examples/qr/dist
