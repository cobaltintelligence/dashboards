#!/bin/run.sh
docker build -t marketsdash ./
containerid=$(docker run -p 3838:3838 marketsdash )
echo $containerid
docker cp $containerid:/out/ ./
echo "============ DONE ============"
