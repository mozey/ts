#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

# Check if .env file exists
if [ ! -f "${APP_DIR}"/.env ]; then
  echo "Configure environment variables as per README"
  exit 1
fi

# Clear build artifacts used by `hugo server` and deploy.sh,
# otherwise static site might not use the latest app build.
# Default build location for app is /www/public/dist
rm -f "${APP_DIR}"/www/static/dist/*
# Also clear static site public dir
rm -rf "${APP_DIR}"/www/public

# Build static site.
# Do this first, other artifacts are created directely in www/public
"${APP_DIR}"/scripts/build-site.sh

# Build app
"${APP_DIR}"/scripts/build-app.sh
# Build SASS
"${APP_DIR}"/make.sh build-sass

# Watch for page changes and re-build, if watcher is installed,
# see https://github.com/mozey/watcher.
# You still have to manually refresh the browser window
if "${GOPATH}"/bin/watcher -version >/dev/null 2>&1; then
  # Watcher runs in background sub-shell
  # https://unix.stackexchange.com/a/302804/309572
  # Static site
  (
    cd "${APP_DIR}"
    # APP_DEBUG=true "${GOPATH}"/bin/watcher -d 1500 -r \
    "${GOPATH}"/bin/watcher -d 1500 -r \
      -dir www \
      -exclude ".*\/.hugo_build.lock$" \
      -excludeDir ".*public.*" \  |
      xargs -n1 bash -c "${APP_DIR}/scripts/build-site.sh"
  ) &

  # App
  (
    cd "${APP_DIR}"
    "${GOPATH}"/bin/watcher -d 1500 -r -dir src |
      xargs -n1 bash -c "${APP_DIR}/scripts/build-app.sh"
  ) &

  # SASS
  (
    cd "${APP_DIR}"
    "${GOPATH}"/bin/watcher -d 1500 -r -dir sass |
      xargs -n1 bash -c "${APP_DIR}/scripts/build-sass.sh"
  ) &
fi

# Static file server
caddy version >/dev/null 2>&1 ||
  {
    echo "Install caddy https://formulae.brew.sh/formula/caddy"
    exit 1
  }
# TODO Print logs with `-access-log` flag and pipe to jq?
# https://caddy.community/t/making-caddy-logs-more-readable/7565
caddy file-server \
  -listen localhost:"${APP_PORT}" \
  -root "${APP_DIR}/www/public" \
  -browse
