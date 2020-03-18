#!/bin/bash

if [ -z "$1" ]; then
  echo "Please, provide PORT!"
  exit 1
fi

npx serve -s build -l $1
npx serve -h
