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
  echo "  $(basename "$0") depends go"
  exit 1
fi

FUNC=${1}

# depends checks for programs this script depends on
depends() {
  OS=$(detect_os)
  BREW_INSTALL=""
  if [[ ${OS} == "linux" ]] || [[ ${OS} == "windows" ]]; then
    # Do not brew install on linux and windows
    BREW_INSTALL="echo"
  fi
  if [[ ${1} == "sass" ]]; then
    sass --version >/dev/null 2>&1 ||
      {
        echo "Install https://sass-lang.com/install"
        ${BREW_INSTALL} brew install sass/sass/sass
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

build-sass() {
  depends sass
  "$APP_DIR"/scripts/build-sass.sh
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
