# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run seed command
if [ -n "$1" ]; then
  npx knex seed:run
else
  npx knex seed:run --specific=$1.js
fi

