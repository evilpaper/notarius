#!/usr/bin/env bash

# ---
# Local development helper – not used in CI.
# ---

# Name of the local Postgres container we manage with this helper script
DB_CONTAINER_NAME="notarius-dev"

echo "Starting database container '$DB_CONTAINER_NAME'..."

# Ensure Docker CLI is available before doing anything else
if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Abort early if the Docker daemon is not running (CLI alone is not enough)
if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

# If the container is already running we can stop here
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

# Start an existing (but currently stopped) container instead of creating a new one
if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# Import environment variables from the project-local configuration file
set -a
source .env

# Pull the password and port parts from DATABASE_URL so we can reuse them below
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

# Warn if the default password is in use and offer to rotate it automatically
if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi

  # Generate a random URL-safe password and update the .env file in-place
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

# Create a new Postgres container configured to match the local application defaults
docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB=notarius_dev \
  -p "$DB_PORT":5432 \
  postgres:17 && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
