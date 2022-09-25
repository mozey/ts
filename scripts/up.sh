#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

# Check if .env file exists
if [ ! -f "${APP_DIR}"/.env ]; then
  echo "Configure environment variables as per README"
  exit 1
fi

# Build app (must be done first, creates artifacts used by static site)
"${APP_DIR}"/scripts/build-app.sh
# Build static site
"${APP_DIR}"/scripts/build-site.sh

# Watch for page changes and re-build static site... 
# ...if watcher is installed, see https://github.com/mozey/watcher.
# You still have to manually refresh the browser window
if "${GOPATH}"/bin/watcher -version >/dev/null 2>&1; then
  # Watcher runs in background sub-shell
  # https://unix.stackexchange.com/a/302804/309572
  (
    cd "${APP_DIR}"
    # APP_DEBUG=true "${GOPATH}"/bin/watcher -d 1500 -r \
    "${GOPATH}"/bin/watcher -d 1500 -r \
      -dir www \
      -exclude ".*\/.hugo_build.lock$" \
      -excludeDir ".*public.*" \ |
      xargs -n1 bash -c "${APP_DIR}/scripts/build-site.sh"
  ) &
fi

# Watch for src changes and re-build app...
if "${GOPATH}"/bin/watcher -version >/dev/null 2>&1; then
  (
    cd "${APP_DIR}"
    "${GOPATH}"/bin/watcher -d 1500 -r -dir src |
      xargs -n1 bash -c "${APP_DIR}/scripts/build-app.sh"
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