#!/usr/bin/env bash
set -eu                   # exit on error or undefined variable
bash -c 'set -o pipefail' # return code of first cmd to fail in a pipeline

APP_DIR="${APP_DIR}"

# https://sass-lang.com/guide
# "Sass has two syntaxes! The SCSS syntax (.scss) is used most commonly. 
# It's a superset of CSS, which means all valid CSS is also valid SCSS. 
# The indented syntax (.sass) is more unusual: it uses indentation rather than 
# curly braces to nest statements, and newlines instead of semicolons"
sass "${APP_DIR}"/sass/app.sass "${APP_DIR}"/www/public/dist/app.css

# TODO Purging is somewhat backwards, and not necessary?
# Rather just build what is used, see comment in sass/app.sass

# Purge unused selectors
# "PurgeCSS analyzes your content and your css files. Then it matches the 
# selectors used in your files with the one in your content files. 
# It removes unused selectors from your css, resulting in smaller css files"
# https://github.com/FullHuman/purgecss

echo "-- Done $(basename "$0")"
echo ""
