#!/bin/bash
set -e

echo ' => Generating two uuids and confirming they are different'
A=$(./scripts/lib/generate-uuid.sh)
B=$(./scripts/lib/generate-uuid.sh)
if [ "$A" == "$B" ]; then
  >&2 echo " => $A and $B are the same."
  exit 1
else
  echo " => $A and $B are different."
fi
