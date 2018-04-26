#!/bin/run.sh
docker build -t dashdemo ./
containerid=$(docker run -d dashdemo)
echo $containerid
docker cp $containerid:/out/ ./
echo "============ DONE ============"
