#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"
SESSION="ts"

cd "${APP_DIR}"

# NOTE Killing the tmux session doesn't necessarily stop spawned processes
# https://unix.stackexchange.com/q/88725/309572

caddy stop || echo "Caddy is not running"
hoverctl stop || :

"${APP_DIR}"/make.sh tmux-kill-session ${SESSION}

echo "Done $(basename "$0")"
echo ""
