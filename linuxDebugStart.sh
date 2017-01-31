#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#Creating directories
if [ -d ""$DIR"/data/db" ]; then
  echo "/data/db already exists"
else
  if [ ! -d ""$DIR"/data" ]; then
    echo "/data directory does not exist"
    echo "creating directory /data"
    mkdir $DIR/data
  else
    echo "/data directory exists"
  fi
  if [ ! -d ""$DIR"/data/db" ]; then
    echo "/data/db directory does not exist"
    echo "creating of directory /data/db"
    mkdir $DIR/data/db
  else
    echo "/data/db already exists"
  fi
fi

#Mongod init
PROCESS_NUM=$(pgrep -n mongod)
echo "Checking if any current instances of mongod are running"
if [ $PROCESS_NUM ]; then
  echo "Mongod is already running"
else
  echo "No other instances found, setting up a new instance"
  service mongod --dbpath $DIR/data/db start
fi

#Server init
echo "Starting up an instance of the server"
LOG_LEVEL=debug nodemon server.js
