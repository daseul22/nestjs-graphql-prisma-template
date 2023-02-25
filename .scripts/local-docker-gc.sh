#!/bin/bash

# local-docker-register Garbage Collection
# 실행되지 않는 컨테이너 삭제 
docker rm $(docker ps -qa --no-trunc --filter "status=exited")
# untaged된 image들 삭제
echo "y" | docker image prune

docker images