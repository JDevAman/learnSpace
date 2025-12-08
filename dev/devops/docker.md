# Docker

## Port Mapping

docker run -d -p 27018:27017 mongo

## Commands

1. Run Mongo: docker run mongo
2. Pull Image: docker pull mongo
3. Powershell: docker ps
4. Detached: docker run -d mongo
5. Kill: docker kill <container-id>
6. Remove docker images:
7. Create Image: docker build -t <name>
8. Passing env variable: docker run -p -e 3000:3000 DATABASE_URL=''
9. Build: docker build -t <app_name>
10. Running Bash Commands: docker exec -it <container-id> /bin/bash
11. Create Volume:
12. Create Network:

## Layers

Each line in DockerFile is layer.
We start with base image acting as base layer.

Why Layers?
These are cached across builds, executions.
All layers below changed are built again.

## Passing env

## Volume

## Network

## DockerFile

file to create docker image of your code and push to docker hub.

## Pushing to docker hub
Create Repository:  Namespace - <username>
docker push <namespace>/<image-name>


Tag:    

## Docker Compose
