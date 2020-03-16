#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Please, provide name for the migration"
  exit 1
fi

# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run migrate command
npx knex migrate:make $1 -x ts
# move created migration file to src directory
for file in "$(pwd)/migrations"/*.ts
do
  if [ -f "$file" ];then
    filename=$(basename $file)
    mv $(pwd)/migrations/$filename $(pwd)/../src/migrations/$filename
  fi
done
