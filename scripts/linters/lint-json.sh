#!/bin/bash
#
# Lint files; make sure they follow style guidelines.
set -e

source ./scripts/lib/start.source.sh

echo "$MYINDENT"'=> Linting json files'
find . -name "*.json" -print0 | \
  while IFS= read -r -d $'\0' line; do
    docker run --rm -v "$(pwd)":/app/code dcycle/json-lint ./code/"$line"
  done

source ./scripts/lib/end.source.sh
