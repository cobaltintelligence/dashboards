#!/bin/run.sh
docker build -t js_cobalt_dash ./

## If you want to extract stuff from container
# containerid=$(docker run -d parse -e GCP_VISION_KEY=$GCP_VISION_KEY))
# echo $containerid
# docker cp $containerid:/out/ ./
# docker run -e GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS -p 80:80 parse
docker run -e GCP_API_KEY=$GCP_API_KEY -p 3000:3000 js_cobalt_dash

echo "============ DONE ============"
