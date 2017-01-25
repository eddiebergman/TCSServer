#!/bin/bash

#Creating directories
if [ -d "/data/db" ]; then
  echo "/data/db already exists"
else
  if [ ! -d "/data" ]; then
    echo "/data directory does not exist"
    echo "creating directory /data"
    mkdir /data
  else
    echo "/data directory exists"
  fi
  if [ ! -d "/data/db" ]; then
    echo "/data/db directory does not exist"
    echo "creating of directory /data/db"
    mkdir /data/db
  else
    echo "/data/db already exists"
  fi
fi
#TODO try get file permissions working
#Mongod init
PROCESS_NUM=$(pgrep -n mongod)
echo "Checking if any current instances of mongod are running"
if [ $PROCESS_NUM ]; then
  echo "Mongod is already running"
else
  echo "No other instances found, setting up a new instance"
  sudo mongod &
fi

#Server init
echo "Starting up an instance of the server"
LOG_LEVEL=debug node server.js
