#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

echo "Building app..."

# Static analysis of TypeScript source with tsc, don't bundle
tsc --version >/dev/null 2>&1 ||
  {
    echo "Install TypeScript https://formulae.brew.sh/formula/typescript"
    exit 1
  }
tsc -noEmit --project "${APP_DIR}"

# Bundle app Javascript and CSS with esbuild.
# Sourcemap enables viewing and debugging TypeScript source in Dev Console
# https://esbuild.github.io/api/#sourcemap
esbuild --version >/dev/null 2>&1 ||
  {
    echo "Install esbuild https://formulae.brew.sh/formula/esbuild"
    exit 1
  }
esbuild "${APP_DIR}"/src/app.ts --sourcemap --bundle \
    --outfile="${APP_DIR}"/www/dist/app.js \
    --minify

echo ""