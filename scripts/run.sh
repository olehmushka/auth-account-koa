#!/bin/bash

THIS_DIR=$( dirname "${BASH_SOURCE}" )
. $THIS_DIR/load_configs.sh

load_configs $1
docker-compose build
docker-compose up -d --remove-orphans --force-recreate
docker-compose logs --tail=70 -f
