# Docker

## Port Mapping

docker run -d -p 27018:27017 mongo

## Essential Docker Commands

### Images

- Pull Image: docker pull <image_name>
- Build Image: docker build -t <image_name>
- Tag Image: docker tag <local> <namespace>/<repo>:<tag>
- Remove Image: docker rmi <image-id>
- Push to Docker Hub: docker push <namespace>/<image>:<tag>

### Containers

- Run Containers: docker run <image>
- Run Detached: docker run -d <image>
- Run w/ ports: docker run -d -p 3000:3000 <image>
- Run w/ env: docker run -p 3000:3000 -e DATABASE_URL = '' <image>
- Exec Inside Container: docker exec -it <container-id> /bin/bash
- List running: docker ps
- Kill Container: docker kill <id>
- Remove Container: docker rm <id>

### Volumes (Persist Data)

- Create Volume: docker volume create <volume>
- Use Inside Container: docker run -V <volume>:/data/db <image>

### Networks (Service-to-Service Communication)

- Create Network: docker network craete <network>
- Run Container on network: docker run --network <network> <image>

## Layers

Every instruction in Dockerfile = one layer.
Layers are cached → faster rebuilds.
If a layer changes, all layers after it rebuild.

## DockerFile

```
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Key Instructions:

- FROM -> Base Image
- WORKDIR -> Working Directory
- COPy -> Copies source files
- RUN -> executes instructions during build
- CMD -> default start command

## Before Docker Compose

- Passing env
- Volume
- Network
- Pushing to docker hub

All these need to be added and run.
Docker compose takes away pain of configuring.

## Docker Compose (Multi-Container Setup)

A tool to manage multi-container apps (API + DB + Redis etc.)

compose.yml:

```yml
version: "1.0"
services:
  mongodb:
    image: "mongo"
    container_name: mongodb
    ports: -3000:3000
    volumes:
      -mongodb_data: /data/db

  kizo-api:
    image: kizo-api
    container_name: kizo-api
    depends_on:
      - mongodb
    ports: -3000:3000
    environment:
      MONGO_URL: mongo://mongodb:27017

  volumes:
    mongodb_data:
```

Run:

```sh
 docker compose up
 docker compose up -d # detached
 docker compose down # stop + remove
```

## Backend Dev Must - Knows:

### Bind Mount

It is used for Liver development (sync code with host)

command: docker run -v $(pwd):/app node

### Multi Stage Builds

```
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install --production
CMD ["node", "dist/main.js"]
```

### HealthChecks

```
healthcheck:
    test: ["CMD", "curl", "-f", "http:localhost:3000/health"]
    interval: 10s
    timeout: 2s
    retries: 3
```

### Logging

- Docker automatically collects stdout/stderr.
- Use applogger (Pino) -> Write to stdout

### Networking Inside Compose

- All services auto discover by service-name.
- No localhost inside containers.
