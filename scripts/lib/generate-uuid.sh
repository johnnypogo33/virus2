#!/bin/bash
#
# Generate a UUID.
#
set -e

docker run --rm node /bin/bash -c 'cat /proc/sys/kernel/random/uuid'
