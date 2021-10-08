#!/bin/bash 

docker build -t client .
docker run -d --name client -p 3000:3000 client