#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

if [[ ${1:-} = "help" ]]
then
  echo ""
  echo "USAGE:"
  echo "  $(basename "$0") [ENV]"
  echo ""
  echo "EXAMPLES:"
  echo "  $(basename "$0") # Build for dev by default"
  echo "  $(basename "$0") prod # Build for specified env"
  echo ""
  exit 0
fi

ENV="${1:-dev}"

APP_DIR="${APP_DIR}"
APP_BASE_URL="${APP_BASE_URL}"

echo "Building static site..."
cd "${APP_DIR}"/www # TODO Pass CLI arg to specify root?
hugo --config "${APP_DIR}"/www/config.toml \
  --themesDir "${APP_DIR}"/www/themes \
  --baseURL "${APP_BASE_URL}"

echo "-- Done $(basename "$0")"
echo ""
