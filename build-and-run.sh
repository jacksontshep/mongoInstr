#!/bin/bash

# Check if NSOLID_SAAS is set and not empty
if [ -z "$NSOLID_SAAS" ]; then
    echo "Error: NSOLID_SAAS environment variable is not set or is empty."
    exit 1
fi

# Proceed to build the Docker image
echo "Building Docker image with NSOLID_SAAS=$NSOLID_SAAS..."
docker build --build-arg NSOLID_SAAS="$NSOLID_SAAS" -t mongodemo:latest .

# Run the Docker containers using docker-compose
docker-compose up -d