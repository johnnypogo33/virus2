#!/bin/bash
#
# Lint files; make sure they follow style guidelines.
set -e

source ./scripts/lib/start.source.sh

echo "$MYINDENT"'=> Linting all file types'
"$BASE"/scripts/linters/lint-shell.sh
"$BASE"/scripts/linters/lint-yaml.sh
"$BASE"/scripts/linters/lint-js.sh
"$BASE"/scripts/linters/lint-json.sh

source ./scripts/lib/end.source.sh
