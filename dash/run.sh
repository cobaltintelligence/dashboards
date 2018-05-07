#!/bin/run.sh
# Kill off old containers
docker ps -a | awk '{ print $1,$2 }' | grep dashdemo | awk '{print $1 }' | xargs -I {} docker rm {}

# Build new image
docker build -t dashdemo ./

# Launch container. TODO: Fix Daemon mode
docker run -p 8080:8080 dashdemo
# echo $containerid
# docker cp $containerid:/out/ ./
echo "============ DONE ============"
