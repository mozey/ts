#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

echo "Building static site..."
cd "${APP_DIR}"/www # TODO Pass CLI arg to specify root?
hugo --config "${APP_DIR}"/www/config.toml --themesDir "${APP_DIR}"/www/themes

echo "-- Done $(basename "$0")"
echo ""
