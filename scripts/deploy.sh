#!/usr/bin/env bash
set -eu # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR=${APP_DIR}
AWS_PROFILE=${AWS_PROFILE}

# Clear previous build
rm -rf www/public

# Build static site.
# Do this first, other artifacts are created directely in www/public
"${APP_DIR}"/make.sh build-site prod

# Build app
"${APP_DIR}"/make.sh build-app
# Build SASS
"${APP_DIR}"/make.sh build-sass

# Remove hidden files
# https://unix.stackexchange.com/a/167824/309572
find "${APP_DIR}"/www/public -name .DS_Store -type f -delete

# Deploy to S3
aws --profile "${AWS_PROFILE}" \
    s3 sync "${APP_DIR}"/www/public s3://"${APP_AWS_WEBSITE_BUCKET}" \
    --delete
