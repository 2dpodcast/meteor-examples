#!/bin/bash

x=$(meteor mongo things-we-like.meteor.com --url)
n=$(echo $x | sed -re "s#.+://client:(.+)@(.+):(.+)/(.+)#\1 \2 \3 \4#")

set -- $n

password=$1
host=$2
port=$3
database=$4

mongoimport --host $host --port $port --username client --password $password --collection things --db $database --upsert things.json
