# Assuming you have the latest version Docker installed, this script will
# fully create or update your environment.
#

# See http://patorjk.com/software/taag/#p=display&f=Ivrit&t=D8%20Starterkit%0A
cat ./scripts/lib/my-ascii-art.txt
echo ''

source ./scripts/lib/source-env.source.sh
echo ''
echo '-----'
echo 'Pull latest versions of base images.'
docker pull node:alpine
docker pull mongo:4
docker build -t my/starterkit-node .

echo ''
echo '-----'
echo 'About to create the starterkit_drupal8site_default network if it does'
echo 'exist, because we need it to have a predictable name when we try to'
echo 'connect other containers to it (for example browser testers).'
echo 'The network is then referenced in docker-compose.yml.'
echo 'See https://github.com/docker/compose/issues/3736.'
docker network ls | grep "$DOCKERNETWORK" || docker network create "$DOCKERNETWORK"

./scripts/docker-compose.sh up -d --build
./scripts/docker-compose.sh restart
./scripts/docker-compose.sh ps
./scripts/uli.sh
