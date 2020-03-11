if [ -n "$1" ]; then
  echo "Please, provide name for the migration"
fi

# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run migrate command
npx knex migrate:make $1 -x ts
# move created migration file to src directory
mv $(pwd)/migrations/ $(pwd)/../src/migrations/
