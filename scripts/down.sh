#!/bin/bash
#
# Shut down the node installation, keeping its data for next time.
#
set -e

source ./scripts/lib/start.source.sh

source "$BASE"/scripts/lib/source-env.source.sh

"$BASE"/scripts/docker-compose.sh down

source ./scripts/lib/end.source.sh
