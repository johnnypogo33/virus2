#!/bin/bash
set -e

export BASE=./scripts/tests-bash/scripts/lint.test/
OUTPUT=$(./scripts/lint.sh)
echo "$OUTPUT" | grep 'lint js called'
echo "$OUTPUT" | grep 'lint json called'
echo "$OUTPUT" | grep 'lint yaml called'
echo "$OUTPUT" | grep 'lint shell called'
