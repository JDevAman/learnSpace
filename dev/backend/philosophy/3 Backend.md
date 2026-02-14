# Backend

Any PC Server which is available online on network, takes requests and then returns responses.
Domain Name: www.devaman.space
Subdomain: kizo in kizo.devaman.space (CNAME in DNS)

Flow:
Browser request -> DNS -> AWS/GCP -> VM -> Nginx (listens on 80 and redirects to 3001 w 443) -> App

Why?
Persist Data, Share and Process Data

# Frontend

Flow:
Browser Request -> DNS -> AWS/GCp -> VM -> Nginx -> sends js, css files -> Browser fetches and then hydrates.
Browser is fetcher, executor in frontend whereas server is executor in backend.
Browser fetches data from remote server and executes them. If not careful, websites can read data.

Why Backend? Security, CORS, Databases, Compute Power

# Benefits of learning from first principles

1. Seeing Big Plans
2. Faster Onboarding
3. 10x faster in new projects
4. Syntax Fatigue (Node -> SpringBoot): Yk be principles, keep doing small components in new tech stack.
5. Chasing right tool for right job. (Redis - Cache, Postgres - Relational, Mongo - Non Relational, Kafka - Event Streaming )
6. More employable
