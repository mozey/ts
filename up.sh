#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

if [[ ${1:-} = "help" ]]
then
  echo ""
  echo "USAGE:"
  echo "  $(basename "$0")"
  echo ""
  echo "EXAMPLES:"
  echo "  $(basename "$0")"
  echo "  $(basename "$0")"
  echo ""
  exit 0
fi

APP_DIR="${APP_DIR}"
SESSION="ts"

cd "${APP_DIR}"

# Check if .env file exists
if [ ! -f "${APP_DIR}"/.env ]; then
  echo "Configure environment variables as per README"
  exit 1
fi

# ..............................................................................
# Clear build artifacts used by `hugo server` and deploy.sh,
# otherwise static site might not use the latest app build.
# Default build location for app is /www/public/dist
rm -f "${APP_DIR}"/www/static/dist/*
# Also clear static site public dir
rm -rf "${APP_DIR}"/www/public

# ..............................................................................
# Build scripts run first to make sure they don't error,
# and to refresh cache, before initializing the watchers

# Static site first, other artifacts are created in www/public
./make.sh build-site
# App
./make.sh build-app
# SASS
./make.sh build-sass

# ..............................................................................

init() {
  echo "Init..."

  ./make.sh tmux-new-session ${SESSION}
  ./make.sh init-caddy ${SESSION}

  # Watch for page changes and re-build, if watcher is installed,
  # see https://github.com/mozey/watcher.
  # You still have to manually refresh the browser window
  if "${GOPATH}"/bin/watcher -version >/dev/null 2>&1; then
    ./make.sh tmux-new-window "${SESSION}"
    ./make.sh init-site ${SESSION}

    ./make.sh tmux-split-window "${SESSION}" "horizontal" 60 
    ./make.sh init-app ${SESSION}

    ./make.sh tmux-split-window "${SESSION}" "horizontal" 50 
    ./make.sh init-sass ${SESSION}
  fi

  ./make.sh tmux-select-window "${SESSION}:0"
  
  # List tmux sessions
  echo ""
  echo "SESSIONS"
  tmux ls

  echo ""
  echo "USAGE"
  echo "  tmux a # Attach to tmux session"
  echo "  C-b ? # Display tmux help"
  echo ""
}

# Call init if session not found
./make.sh depends tmux
tmux ls | grep ${SESSION} || init

echo "Done $(basename "$0")"
echo ""

