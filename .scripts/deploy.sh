#!/bin/bash

cd /opt/docker/$AWS_ECR_REPO/$AWS_ECR_REPO_TAG

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_HOST

docker pull $ECR_HOST/$AWS_ECR_REPO:$AWS_ECR_REPO_TAG

docker-compose -f docker-compose.$AWS_ECR_REPO_TAG.yml up -d
