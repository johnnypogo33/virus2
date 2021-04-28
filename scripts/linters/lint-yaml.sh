#!/bin/bash
#
# Lint files; make sure they follow style guidelines.
set -e

source ./scripts/lib/start.source.sh

echo "$MYINDENT"'=> Linting yaml files'
docker run --rm -v "$(pwd)":/code dcycle/yaml-lint:2 /code

source ./scripts/lib/end.source.sh
