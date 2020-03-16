#!/bin/bash

if [ -n "$1" ]; then
  echo "Please, provide name for the seed"
  exit 1
fi

# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run migrate command
npx knex seed:make $1 -x ts
# move created seed file to src directory
for file in "$(pwd)/migrations"/*.ts
do
  if [ -f "$file" ];then
    filename=$(basename $file)
    mv $(pwd)/seeds/$filename $(pwd)/../src/seeds/$filename
  fi
done
