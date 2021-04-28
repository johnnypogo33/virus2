#!/bin/bash
set -e

DUMMYENVFILE=./scripts/tests-bash/scripts/lib/source-env.source.test/.env

echo "Removing dummy $DUMMYENVFILE which might be left over from previous tests."
rm -f "$DUMMYENVFILE"

export BASE=./scripts/tests-bash/scripts/lib/source-env.source.test/
source ./scripts/lib/source-env.source.sh

if [ -f "$DUMMYENVFILE" ]; then
  echo "$DUMMYENVFILE exists and contains:"
  cat $DUMMYENVFILE
else
  >&2 echo "$DUMMYENVFILE does not exist"
  exit 1
fi

echo "Removing dummy $DUMMYENVFILE"
rm -f "$DUMMYENVFILE"
