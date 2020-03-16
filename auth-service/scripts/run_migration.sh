#!/bin/bash

# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run migrate command
npx knex migrate:latest
