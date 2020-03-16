#!/bin/bash

THIS_DIR=$( dirname "${BASH_SOURCE}" )
. $THIS_DIR/colors.sh

load_configs()
{
  logSection "Delete old config directory..."
  rm -rf auth-account-koa_config
  logSection "Pulling new config directory..."
  git clone https://github.com/olehmushka/auth-account-koa_config.git

  # Move certeficates to Auth Service
  logSection "Loading pulled certeficates..."
  for file in "$(pwd)/auth-account-koa_config/certeficates"/*
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
    mv $(pwd)/auth-account-koa_config/certeficates/$FILENAME $DIST_FILE
    logSection "Moved $FILENAME to $(pwd)/auth-service/src/lib/crypto/ ."
  done

  ENV=dev
  if [ -n "$1" ]; then
    $ENV=$1
  fi
  logSection "Loading variables for $ENV environment..."
  PATHNAME=$(pwd)/auth-account-koa_config/variables/$ENV.env
  if [ ! -f "$PATHNAME" ];then
    logError "$PATHNAME does not exist!"
    exit 1
  fi
  logSection "Removing old .env file..."
  rm .env
  logSection "Moving $ENV.env to .env file..."
  mv $PATHNAME .env
}
