#!/bin/sh

echo "Run server"
# ./server_launcher.sh && ./client_launcher.sh && fg
./server_launcher.sh &

echo "Run client"
# bash "./server_launcher.sh"