#!/bin/bash

logSection() {
  local green=`tput setaf 2`
  local reset=`tput sgr0`
  echo "${green}$@${reset}"
}

logWarning() {
  local yellow=`tput setaf 3`
  local reset=`tput sgr0`
  echo "${yellow}$@${reset}"
}

logError() {
  local red=`tput setaf 1`
  local reset=`tput sgr0`
  echo "${red}$@${reset}"
}
