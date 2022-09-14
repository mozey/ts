#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

# USAGE
#   cd ts
#   conf
#   ./scripts/deploy.sh

APP_DIR=${APP_DIR}
AWS_PROFILE=${AWS_PROFILE}

# Remove hidden files
rm -f "${APP_DIR}"/www/.DS_Store

# Deploy to S3
aws --profile "${AWS_PROFILE}" \
    s3 sync "${APP_DIR}"/www s3://"${APP_AWS_WEBSITE_BUCKET}" \
    --delete
