#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_NAME="mozey-ts-store"
tmux send-keys -t ${APP_NAME} C-c
tmux send -t ${APP_NAME} "exit" ENTER
