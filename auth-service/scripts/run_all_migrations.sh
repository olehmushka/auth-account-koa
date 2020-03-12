# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run all migrations command
npx knex migrate:up
