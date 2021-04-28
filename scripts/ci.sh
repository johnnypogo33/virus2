#!/bin/bash
#
# Run the continuous integration script; make sure everything works as expected.
#
# Designed to be run on a new virtual machine with Docker, especially on
# Circle CI, from ./.circleci/config.yml.
set -e

source ./scripts/lib/start.source.sh

echo "$MYINDENT"'=> Running ./scripts/test.sh'
"$BASE"/scripts/test.sh
echo "$MYINDENT"'=> Initial deployment'
"$BASE"/scripts/deploy.sh
echo "$MYINDENT"'=> Incremental deployment'
"$BASE"/scripts/deploy.sh
echo "$MYINDENT"'=> End-to-end tests'
"$BASE"/scripts/end-to-end-tests.sh
echo "$MYINDENT"'=> Destroy'
"$BASE"/scripts/destroy.sh

source ./scripts/lib/end.source.sh
