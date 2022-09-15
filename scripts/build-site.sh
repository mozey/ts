#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

echo "Building static site..."

# TODO
echo "Setup hugo..."
# hugo --config "${APP_DIR}"/www/config.yaml