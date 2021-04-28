#!/bin/bash
set -e

export BASE=./scripts/tests-bash/scripts/ci.test/
OUTPUT=$(./scripts/ci.sh)
echo "$OUTPUT" | grep 'deploy called'
echo "$OUTPUT" | grep 'test called'
echo "$OUTPUT" | grep 'destroy called'
