#!/usr/bin/env bash
set -u                    # exit on undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

# Print random open port. Inspired by
# https://superuser.com/a/1041677/537059

CHECK="init"
while [[ ! -z $CHECK ]]; do
  PORT=$(((RANDOM % 60000) + 1025))
  # Match end of word boundary to avoid false positives,
  # e.g. 2000 matching 20000
  # https://stackoverflow.com/a/34074458/639133
  CHECK=$(netstat -an -ptcp | grep LISTEN | grep -r "${PORT}\b")
done

# Done
echo ${PORT}
