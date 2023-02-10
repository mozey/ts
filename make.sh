#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

EXPECTED_ARGS=1

if [[ $# -lt ${EXPECTED_ARGS} ]]; then
  echo "Usage:"
  echo "  $(basename "$0") FUNC [ARGS...]"
  echo ""
  echo "Execute the specified func"
  echo ""
  echo "Examples:"
  echo "  $(basename "$0") depends sass"
  exit 1
fi

FUNC=${1}

# depends checks for programs this script depends on
depends() {
  OS=$(detect_os)
  if [[ ${OS} == "linux" ]] || [[ ${OS} == "windows" ]]; then
    echo "Default instruction are for users on macOS,"
    echo "using Homebrew https://brew.sh/"
    echo ""
    echo "It is possible to use Homebrew on Linux or Windows,"
    echo "see this https://docs.brew.sh/Homebrew-on-Linux"
    echo ""
    echo "Alternatively use https://chocolatey.org/ for Windows,"
    echo "or your Linux distro's package manager"
    echo ""
  fi

  if [[ ${1} == "caddy" ]]; then
    caddy version >/dev/null 2>&1 ||
      {
        echo "Install caddy https://formulae.brew.sh/formula/caddy"
        exit 0
      }

  elif [[ ${1} == "esbuild" ]]; then
    esbuild --version >/dev/null 2>&1 ||
      {
        echo "Install esbuild https://formulae.brew.sh/formula/esbuild"
        exit 0
      }

  elif [[ ${1} == "hugo" ]]; then
    hugo version >/dev/null 2>&1 ||
      {
        echo "Install Hugo https://formulae.brew.sh/formula/hugo"
        exit 0
      }

  elif [[ ${1} == "tsc" ]]; then
    tsc --version >/dev/null 2>&1 ||
      {
        echo "Install TypeScript https://formulae.brew.sh/formula/typescript"
        exit 0
      }

  elif [[ ${1} == "sass" ]]; then
    sass --version >/dev/null 2>&1 ||
      {
        echo "Install SASS https://github.com/sass/homebrew-sass"
        exit 0
      }

  elif [[ ${1} == "tmux" ]]; then
    tmux -V >/dev/null 2>&1 ||
      {
        echo "Install tmux https://formulae.brew.sh/formula/tmux"
        exit 0
      }

  elif [[ ${1} == "watcher" ]]; then
    watcher -version >/dev/null 2>&1 ||
      {
        echo "Install https://github.com/mozey/watcher"
        exit 0
      }

  else
    echo "Unknown dependency ${1}"
    exit 1
  fi
}

# detect_os is useful when writing cross platform functions.
# Return value must corrrespond to GOOS listed here
# https://go.dev/doc/install/source#environment
# shellcheck disable=2120
detect_os() {
  # Check if func arg is set
  # https://stackoverflow.com/a/13864829/639133
  if [ -z ${1+x} ]; then
    OUTPUT=$(uname -s)
  else
    # This is useful when parsing output from a remote host
    OUTPUT="$1"
  fi
  case "$OUTPUT" in
  Darwin)
    echo 'darwin'
    ;;
  Linux)
    echo 'linux'
    ;;
  CYGWIN* | MINGW32* | MSYS* | MINGW*)
    echo 'windows'
    ;;
  # Detect additional OS's here...
  # See correspondence table at the bottom of this link
  # https://stackoverflow.com/a/27776822/639133
  *)
    echo 'other'
    ;;
  esac
}

# NOTE Wrapping the tmux commands here makes it easier to
# make then run remotely, or inside a docker container

# tmux-kill-session if it exists
tmux-kill-session() {
  SESSION="$1"
  tmux kill-session -t "$SESSION"
}

# tmux-new-session creates a named tmux session
tmux-new-session() {
  SESSION="$1"
  tmux new-session -d -s "$SESSION"
  # Assuming default shell is bash
  # tmux-send-cmd "$SESSION" "bash"
}

# tmux-send-cmd sends a single command to the tmux target
tmux-send-cmd() {
  # See link re. target syntax: ${SESSION}:${WINDOW}.${PANE}
  # https://superuser.com/a/492549/537059
  TARGET="$1"
  CMD="$2"
  # See "Bash scripts with tmux to launch a 4-paned window" for an example
  # of how this might be used with the other tmux funcs
  # https://stackoverflow.com/a/74960818/639133
  tmux send-keys -t "$TARGET" "$CMD" ENTER
}

# tmux-send-keys sends keys to the tmux target
tmux-send-keys() {
  TARGET="$1"
  KEYS="$2"
  # See "tmux send-keys syntax" for prefix explanation, e.g.
  # "tmux-send-keys ${TARGET} C-c"
  # https://stackoverflow.com/a/19330452/639133
  tmux send-keys -t "$TARGET" "$KEYS"
}

tmux-split-window() {
  TARGET="$1"
  ORIENTATION="$2"
  PERCENTAGE="$3"
  if [[ "$ORIENTATION" == "vertical" ]]; then
    tmux split-window -v -p "${PERCENTAGE}" -t "${TARGET}"
  elif [[ "$ORIENTATION" == "horizontal" ]]; then
    tmux split-window -h -p "${PERCENTAGE}" -t "${TARGET}"
  else
    echo "invalid orientation ${ORIENTATION}"
    exit 1
  fi
}

tmux-new-window() {
  TARGET="$1"
  tmux new-window -t "${TARGET}"
}

tmux-select-window() {
  TARGET="$1"
  tmux select-window -t "${TARGET}"
}

build-app() {
  depends tsc
  depends esbuild
  "${APP_DIR}"/scripts/build/app.sh
}

build-sass() {
  depends sass
  "$APP_DIR"/scripts/build/sass.sh
}

build-site() {
  depends hugo
  "$APP_DIR"/scripts/build/site.sh
}

gen-caddyfile() {
  SAMPLE="${APP_DIR}/sample.Caddyfile"
  CADDYFILE="${APP_DIR}/Caddyfile"
  cp "${SAMPLE}" "${CADDYFILE}"
  # Set variables in sample template from env
  (
    OUTPUT=$(APP_DIR="$APP_DIR" \
      APP_LISTEN="$APP_LISTEN" \
      APP_PORT="$APP_PORT" \
      envsubst <"$CADDYFILE")
    echo "$OUTPUT" >"$CADDYFILE"
  )
}

init-caddy() {
  SESSION="$1"
  depends caddy
  echo "Caddy static file server..."

  gen-caddyfile
  # TODO Print logs with `-access-log` flag and pipe to jq?
  # https://caddy.community/t/making-caddy-logs-more-readable/7565
  tmux-send-cmd "${SESSION}" "caddy run"
}

watch-site() {
  depends watcher
  # APP_DEBUG=true "${GOPATH}"/bin/watcher -d 1500 -r \
  "${GOPATH}"/bin/watcher -d 1500 -r \
    -dir www \
    -exclude ".*\/.hugo_build.lock$" \
    -excludeDir ".*public.*" \
    -excludeDir ".*static\/icons\/MaterialDesign-SVG.*" \  |
    xargs -n1 bash -c "${APP_DIR}/make.sh build-site"
}

init-site() {
  SESSION="$1"
  depends hugo
  echo "Hugo site live-reload watcher..."
  tmux-send-cmd "${SESSION}" "./make.sh watch-site"
}

watch-app() {
  depends watcher
  "${GOPATH}"/bin/watcher -d 1500 -r -dir src |
    xargs -n1 bash -c "${APP_DIR}/make.sh build-app"
}

init-app() {
  SESSION="$1"
  depends tsc
  echo "TypeScript app live-reload watcher..."
  tmux-send-cmd "${SESSION}" "./make.sh watch-app"
}

watch-sass() {
  depends watcher
  "${GOPATH}"/bin/watcher -d 1500 -r -dir sass |
    xargs -n1 bash -c "${APP_DIR}/make.sh build-sass"
}

init-sass() {
  SESSION="$1"
  depends sass
  echo "SASS live-reload watcher..."
  tmux-send-cmd "${SESSION}" "./make.sh watch-sass"
}

# ..............................................................................

APP_DIR="$APP_DIR"

# Execute FUNC if it's a func defined in this script
TYPE=$(type -t "${FUNC}" || echo "undefined")
if [[ ${TYPE} == "function" ]]; then
  # Additional arguments, after the func, are passed through.
  # For example, `./make.sh FUNC ARG1`
  ${FUNC} "${@:2}"
else
  echo "FUNC ${FUNC} not implemented"
  exit 1
fi
