#!/bin/bash

THIS_DIR=$( dirname "${BASH_SOURCE}" )
CONFIG_REPO_NAME="auth-account-koa_config"
. $THIS_DIR/colors.sh

refreshConfigDir()
{
  echo "Delete old config directory..."
  rm -rf $CONFIG_REPO_NAME
  echo "Pulling new config directory..."
  git clone https://github.com/olehmushka/$CONFIG_REPO_NAME.git
}

applyCerteficates()
{
  echo "Loading pulled certeficates..."
  for file in "$(pwd)/$CONFIG_REPO_NAME/certeficates"/*
  do
    if [ ! -f "$file" ];then
      continue
    fi
    FILENAME=$(basename $file)
    DIST_FILE=$(pwd)/auth-service/src/lib/crypto/$FILENAME
    if [ -f "$DIST_FILE" ];then
      rm $DIST_FILE
      logSection "Deleted old $DIST_FILE ."
    fi
    mv $(pwd)/$CONFIG_REPO_NAME/certeficates/$FILENAME $DIST_FILE
    logSection "Moved $FILENAME to $(pwd)/auth-service/src/lib/crypto/ ."
  done
}

refreshEnvFile()
{
  ENV=dev
  if [ -n "$1" ]; then
    $ENV=$1
  fi
  echo "Loading variables for $ENV environment..."
  PATHNAME=$(pwd)/$CONFIG_REPO_NAME/variables/$ENV.env
  if [ ! -f "$PATHNAME" ];then
    logError "$PATHNAME does not exist!"
    exit 1
  fi
  echo "Removing old .env file..."
  rm .env
  echo "Moving $ENV.env to .env file..."
  mv $PATHNAME .env
}

load_configs()
{
  refreshConfigDir
  applyCerteficates
  refreshEnvFile $1
  rm -rf $CONFIG_REPO_NAME
  logSection "Removed $CONFIG_REPO_NAME directory."
}
