#!/bin/bash
#
# Run unit tests on bash scripts.
# See /scripts/tests-bash/README.md
set -e

source ./scripts/lib/start.source.sh

echo "$MYINDENT"'=> Running unit tests on bash scripts.'

find "$BASE"/scripts/tests-bash -name "*.test.sh" -print0 | \
  while IFS= read -r -d $'\0' line; do
    echo "$MYINDENT"" => Running $line"
    "$line"
  done

source ./scripts/lib/end.source.sh

echo "$MYINDENT"'=> All done testing bash scripts!'
