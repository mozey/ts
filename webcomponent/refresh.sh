#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

echo "Refreshing src..."
cp ../template/template.ts ./
# etc...
