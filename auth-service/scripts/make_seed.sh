if [ -n "$1" ]; then
  echo "Please, provide name for the seed"
fi

# build the project to get actual knexfile.js in dist dir to use it
yarn build
cd ./dist
# run migrate command
npx knex seed:make $1 -x ts
# move created seed file to src directory
mv $(pwd)/seeds/ $(pwd)/../src/seeds/
