#!/bin/bash
#
# Get line count of a file.
# See https://stackoverflow.com/a/35053635/1207752
#
set -e

wc -l < "$1" | tr -d ' '
