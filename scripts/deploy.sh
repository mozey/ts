#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

# TODO Refactor help message as per build-app.sh
# USAGE
#   cd ts
#   conf
#   ./scripts/deploy.sh

APP_DIR=${APP_DIR}
AWS_PROFILE=${AWS_PROFILE}

# Remove hidden files
rm -f "${APP_DIR}"/www/.DS_Store

# TODO Review build commands
"${APP_DIR}"/scripts/build-app.sh static
cd "${APP_DIR}"/www
hugo --baseURL "${APP_BASE_URL}"

# Deploy to S3
aws --profile "${AWS_PROFILE}" \
    s3 sync "${APP_DIR}"/www/public s3://"${APP_AWS_WEBSITE_BUCKET}" \
    --delete
