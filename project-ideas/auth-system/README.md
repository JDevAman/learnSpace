# Val8

A resuable authentication microservice (gateway) written in TypeScript + NestJs which is to be used across multiple projects.
Made by me, for me.



Features:
Decentralized GateWay that will rate limit, session, add trace, log, authN & authZ access.

Approaches:
Auth:
* JWTs - Stateless
* Stateful - Sessions with Redis Backed and Dual Token Approach

DBs: 
* Mongo
* PostGres

AuthZ:
* Role Based
* Tag / Attribute Based
* Relationship Based

Queries:
How to handle SSO?
How to release and update patches for all instances?

