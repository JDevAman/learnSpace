# 1. Backend Engineering

Goal: To build reliable, scalable, fault-tolerant, and maintainable systems, moving beyond basic CRUD APIs.

## 🟢 I. Foundational Concepts

Status: ⬜ Not Started | 🟦 In Progress | ✅ Completed

[✅] High-Level Understanding

- Request flow: Browser → Server → Response.

[✅] HTTP Protocol Deep Dive

- Headers, Methods (GET, POST, etc.), and Status Codes.
- CORS (Simple vs. Pre-flight).
- Caching (ETags, Max-Age).
- Versions (HTTP/1.1, 2.0, 3.0) and Security (TLS/SSL).

[✅] Routing

- Static, Dynamic, and Regex-based routes.
- API Versioning & Route Grouping.

[✅] Serialization & Deserialization

- Formats: JSON/XML vs. Binary (Protobuf).
- Security: Validation before deserialization.

[✅] Authentication & Authorization

- State (Sessions) vs. Stateless (JWT).
- Models: RBAC, ABAC, ReBAC.
- Security: Hashing, Salting, CSRF/XSS protection.

[🟦] Validation & Transformation

- Syntactic vs. Semantic validation.
- Sanitization (Preventing SQL Injection).

## 🏗️ II. Application Structure & Design

Status: ⬜ Not Started

[ ] Middlewares

- Chaining, execution order, and the next function.

[ ] Request Context

- Managing request-scoped state and Trace IDs.

[ ] Handlers, Controllers, and Services

- The MVC Pattern and Separation of Concerns.

[ ] CRUD Deep Dive

- Pagination, Search, Sorting, and Filtering.

[ ] RESTful Architecture

- Resource-based design and OpenAPI specs.

[ ] Business Logic Layer (BLL)

- Layered architecture: Presentation vs. BLL vs. Data Access (DAL).

[ ] Concurrency & Asynchrony

- Threads vs. Event Loops (Node.js) vs. Goroutines (Go).
- Handling Race Conditions and Deadlocks.

[ ] API Design Patterns

- Beyond REST: Introduction to GraphQL (when to use) and gRPC (internal service comms).
- Standardized Error Objects (RFC 7807).

## 💾 III. Data Management & Storage

Status: ⬜ Not Started

[✅] Databases

- ACID properties and CAP Theorem.
- Relational vs. NoSQL.
- Indexing and Query Optimization.

[✅] Caching Strategies

- Cache-aside, Write-through, Write-behind.
- Eviction: LRU, LFU, TTL.

[ ] Object Storage (27:47)

- Managing large files, Chunking, and Streaming.

[ ] Data Modeling

- Normalization (1NF to 3NF) vs. Denormalization for performance.

[ ] Distributed Transactions

- The Saga Pattern and Two-Phase Commit (2PC).

## 🚀 IV. Advanced Backend Concepts

Status: ⬜ Not Started

[ ] Task Queues & Scheduling

- Background jobs, Retries, and Priority Queues.

[ ] Search Engines (Elasticsearch)

- Inverted Index, Sharding, and Relevance Scoring.

[ ] Logging & Observability

- Structured logging, Metrics (Prometheus), and Tracing.

[ ] Graceful Shutdown

- Handling SIGINT/SIGTERM and closing resources.

[ ] Scaling & Performance

- Identifying bottlenecks and N+1 query problems.

[ ] Real-time Systems

- WebSockets, SSE, and Pub/Sub.

[ ] Resiliency Patterns

- Circuit Breakers, Retries with Exponential Backoff, and Bulkheads.

## ⚙️ V. Development Standards & Operations

Status: ⬜ Not Started

[ ] The 12-Factor App (28:50)

[ ] Webhooks (29:58)

- Event-driven integration and Signature Verification.

[ ] DevOps for Backend (30:39)

- CI/CD, Docker, Kubernetes.
- Horizontal vs. Vertical Scaling.

[ ] Security Checklist

- OWASP Top 10 (SQLi, Broken Auth, Security Misconfigurations).
- Secret Management (Vault, AWS Secrets Manager).

---

🛠️ Walking this path

To truly learn from "First Principles," do not just watch the videos. Follow this Study-Build-Audit cycle for each major section:

1. The "Study" Phase (Theoretical)
   Immerse in videos to get the philosophy.
   Ask "Why": For every topic, ask: "What problem does this solve?" and "What happens if I don't use this?"

2. The "Implementation" Phase (Practical)
   Implementation of Philosophy and Study part from scratch.
   Try "Breaking" it ie reverse engineering.

3. The "Audit" Phase (Reflection)
   Building Production Grade Projects with Best Practices for eg performance, security and maintainability.


# 3. Backend vs Frontend

## Backend
Any PC Server which is available online on network, takes requests and then returns responses.
Domain Name: www.devaman.space
Subdomain: kizo in kizo.devaman.space (CNAME in DNS)

Flow:
Browser request -> DNS -> AWS/GCP -> VM -> Nginx (listens on 80 and redirects to 3001 w 443) -> App

Why?
Persist Data, Share and Process Data

## Frontend

Flow:
Browser Request -> DNS -> AWS/GCp -> VM -> Nginx -> sends js, css files -> Browser fetches and then hydrates.
Browser is fetcher, executor in frontend whereas server is executor in backend.
Browser fetches data from remote server and executes them. If not careful, websites can read data.

Why Backend? Security, CORS, Databases, Compute Power

## Benefits of learning from first principles

1. Seeing Big Plans
2. Faster Onboarding
3. 10x faster in new projects
4. Syntax Fatigue (Node -> SpringBoot): Yk be principles, keep doing small components in new tech stack.
5. Chasing right tool for right job. (Redis - Cache, Postgres - Relational, Mongo - Non Relational, Kafka - Event Streaming )
6. More employable


# 5.HTTP

## I. Core Architectural Concepts

1. Statelessness
   - Definition: Each request is an isolated transaction. The server does not store any "memory" of previous interactions in its active RAM for that connection.
   - Backend Scaling: This is why we can use a Load Balancer. If Request #1 goes to Server A and Request #2 goes to Server B, the system doesn't break.
   - State Management: Since the protocol is stateless, the Application must manage state.
     - Client-side: Cookies, LocalStorage, SessionStorage.
     - Server-side: Redis sessions, Database records.

2. Client - Server Model
   - The Pull Mechanism: The server is reactive. It listens on a specific port (80 for HTTP, 443 for HTTPS) and waits for the client to initiate a TCP/QUIC handshake.
   - The Connection: Historically handled via TCP (Three-way handshake). Modern backends are shifting toward QUIC (UDP) to reduce latency.

3. OSI Model & The Backend Perspective

Backend engineers primarily live at Layer 7 (Application), but performance issues often stem from Layer 4 (Transport).

| Layer | Name | Backend Relevance |
| L7 | Application | HTTP, gRPC, WebSockets, APIs. |
| L6 | Presentation | JSON/XML serialization, TLS encryption/decryption. |
| L5 | Session | Connection persistence, Auth sessions. |
| L4 | Transport | TCP/UDP, Port numbers, Flow control. |
| L3 | Network | IP Addresses, Routers, ICMP. |
| L2 | Data Link | MAC addresses, Switches. |
| L1 | Physical | Cables, Fiber, Radio waves. |

### Evolution of HTTP

Understanding the evolution helps you understand why modern backends are complex.

1. HTTP/0.9 (1991): The "One-line protocol." Only GET existed. No headers, no status codes—just raw HTML.
2. HTTP/1.0 (1996): Added versioning, status codes, and headers. Introduced the ability to send metadata alongside the body.
3. HTTP/1.1 (1997-Present): The current backbone.
   - Keep-Alive: Connections stay open for multiple requests, reducing handshake overhead.
   - Chunked Encoding: Streaming responses.
   - Problem: Head-of-Line (HOL) Blocking—one slow request blocks everything else on that connection.
4. HTTP/2 (2015): Focus on performance.
   - Binary Framing: No longer plain text; much faster to parse.
   - Multiplexing: Multiple requests/responses are sent simultaneously over a single TCP connection.
   - Server Push: Server sends resources before the client asks.

5. HTTP/3 (Current Frontier):
   - QUIC over UDP: Replaces TCP.
   - Eliminates HOL Blocking: If one packet is lost, other streams in the same connection continue unaffected.
   - Zero-RTT Handshake: Faster connection establishment for returning users.

## III. The Message Structure

HTTP Messages are text-based(in 1.1) and rely on CRLF(Carriage Return Line Feed) sequence.

1. Request Strcture

```http
PUT /api/users/12345 HTTP/1.1        <-- Request Line (Method, Path, Version)
Host: example.com                    <-- Target domain
User-Agent: Mozilla/5.0...           <-- Browser/Client info
Content-Type: application/json       <-- Format of the body
Content-Length: 45                   <-- Size in bytes
Authorization: Bearer eyJH6c1...     <-- Security token
Accept: application/json             <-- What the client wants back
Accept-Encoding: gzip, deflate       <-- Compression support
Connection: keep-alive               <-- Stay open
Referer: https://google.com          <-- Where the user came from
Cookie: sessionId=abc123             <-- Stored session data

{                                    <-- Blank line (\r\n\r\n) separates headers from body
    "firstName": "John",
    "lastName": "Doe"
}
```

2. Response Structure

```http
HTTP/1.1 200 OK                      <-- Status Line
Date: Mon, 18 Jan 2026 13:00:00 GMT
Content-Type: application/json
Content-Length: 85
Server: Apache/2.4.41                <-- Server software signature
Cache-Control: no-store              <-- Caching instructions
X-Request-ID: f47ac10b-58cc...       <-- Distributed tracing ID
Strict-Transport-Security: max-age=  <-- HSTS Security
Set-Cookie: sessionId=xyz789; Secure; HttpOnly <-- Instructs browser to store data
Vary: Accept-Encoding                <-- Tells caches to check encoding

{
    "message": "User updated successfully",
    "userId": 12345,
    "status": "success"
}
```

## IV. Detailed Header Breakdown:

Security Headers (The "Shield")

- HSTS (Strict-Transport-Security): Forces the browser to never communicate via plain HTTP.
- CSP (Content-Security-Policy): Controls which resources (scripts, images) the browser is allowed to load.
- X-Frame-Options: Prevents the site from being rendered in an <iframe/> (prevents Clickjacking).
- Set-Cookie:
  - HttpOnly: JavaScript cannot access the cookie (prevents XSS theft).
  - Secure: Cookie only sent over HTTPS.
  - SameSite: Prevents CSRF attacks.

Content Negotiation & Control

- Accept-Encoding: The client says "I can decompress gzip."
- Transfer-Encoding: chunked: The server sends data in pieces without knowing the final size (used for large exports).
- ETag: A "version finger-print" of a resource. If the ETag hasn't changed, the server returns a 304 Not Modified.

### V. Methods & CORS Flow

| Method | Idempotent? | Safe? | Body? |Description|
|GET|Yes|Yes|No|Fetch data without side effects.|
|POST|No|No|Yes|Create new resources; calling twice creates two items.|
|PUT|Yes|No|Yes|Replace a resource entirely.|
|PATCH|No/Yes\*|No|Yes| Partial update. (Recommended for efficiency).|
|DELETE|Yes|No|No|Remove a resource.|
|OPTIONS|Yes|Yes|No|Preflight check for CORS.|

The CORS Flow (Cross-Origin-Resource Sharing)

1.  Simple Request:

- GET/POST with simple headers.
- The browser sends the request and checks the response's Access-Control-Allow-Origin.
- Example:

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json
  Access-Control-Allow-Origin: https://example.com

          {
              product:{
                  "id": 123,
                  "name":"Example Product
              }
          }

  ```

2.  Preflight (OPTIONS):
    - Trigger: Method is PUT/PATCH/DELETE or custom headers like Authorization are present.
    - The Check: Browser sends OPTIONS first.
    - The Response: Server returns Access-Control-Allow-Methods and Access-Control-Max-Age.
    - Result: Browser only sends the actual request if the OPTIONS call succeeds.

    - Example:
      Request:
      OPTIONS /api/resourc HTTP/1.1
      Host: api.anotherdomain.com
      Origin: https://example.com
      Access-Control-Request-Method: PUT
      Access-Control-Request-Headers: Authorization

      Response:
      HTTP/1.1 204 No Content
      Access-Control-Allow-Origin: https://example.com
      Access-Control-Allow-Methods: PUT, DELETE
      Access-Control-Allow-Headers: Authorization
      Access-Control-Nax-Age: 86400

How to check response/request: User BurpSuite\*

### VI. Status Code Quick Reference:

Standardization, Custom Actions upon results.

- 1xx - Information
  101 - Switching Protocols (upgrading to websockets)

- 2xx - Success
  200 - OK, 201 - Created, 204 - No Content (Information in form of Headers)

- 3xx - Redirection
  301 - Moved permanently (SEO friendly), 302 - Found (temporarily moved to diff location), 304 - Not modified (Caching)
- 4xx - Client Error
  400 - Bad Request (Invalid Data), 401 - UnAuthorized ,403 - Forbidden (Not Enough Permissions), 404 - Not Found, 405 - Method not allowed (PUT instead of Patch), 408 - Request Timeout, 409 - Conflict (Unique Name or Folder), 429 - Too Many Requests (Rate Limiting)
- 5xx - Server Error
  500 - Internal Server Error, 501 - Not Implemented (Plan to add), 502 - Bad Gateway (Proxy/Load Balancer failed to connect to the upstream server), 503 - Maintenance (Unavailable), 504 - Gateway timeout (Upstream server took too long)

### VII. Advanced Data Handling & Caching

1. HTTP Caching (Efficiency at the Protocol Level)
   The goal is to avoid re-sending data that the client already has.

- Headers:
  - Cache-Control: The primary "remote control" (e.g., max-age=3600, no-cache, public).
  - ETag: A unique hash/fingerprint of the resource version (e.g., 3141).
  - Last-Modified: A timestamp of when the resource last changed.

- Conditional Requests:
  - If-None-Match: The client sends the ETag back. If the server sees it matches the current version, it returns a 304 Not Modified (empty body).
  - If-Modified-Since: The client sends a date.

- Modern Alternative: TanStack Query (and similar libraries) provide more granular control over "stale-while-revalidate" logic in the application layer, often proving more flexible than raw browser-level HTTP caching.

2. Content Negotiation
   This is how a single URL can serve different formats based on client needs.

- Media Type (Accept): Client asks for application/json, server might fallback to text/xml.
- Language (Accept-Language): Client asks for en-US or fr.
- Encoding (Accept-Encoding): Essential for performance (e.g., gzip, br).

3. Compression Mechanics

- The "Why": A 26.1 MB raw JSON file can be compressed down to ~3.8 MB using Gzip. This saves massive amounts of bandwidth and reduces the "Time to First Byte" (TTFB) for the user.
- Flow:
  1. Client sends Accept-Encoding: gzip.
  2. Server compresses the payload and adds Content-Encoding: gzip.
  3. Browser automatically decompress it before the JS code sees it.

### VIII. Handling Large Requests and Responses

1. Persistent Connections (Keep-Alive)

- HTTP/1.1 Standard: Unlike early versions where a connection closed after one request, HTTP/1.1 keeps the TCP socket open by default.
- Connection: keep-alive: Allows the client to reuse the same "handshaked" connection for multiple images, scripts, and API calls, avoiding the overhead of the 3-way TCP handshake every time.

3. Multipart Requests (Uploading Binary Data)
   When sending files (images, PDFs) along with text, we use multipart/form-data.

- Boundary: A unique string (delimiter) used to separate different parts of the body.
- Structure:
  Content-Type: multipart/form-data; boundary=---MyBoundary

  ---MyBoundary
  Content-Disposition: form-data; name="username"

  johndoe
  ---MyBoundary
  Content-Disposition: form-data; name="profile_pic"; filename="me.jpg"
  Content-Type: image/jpeg

  [BINARY DATA HERE]
  ---MyBoundary--

3. Chunked Responses & Streaming :
   If a response is too big to fit in memory or is being generated in real-time (like a ChatGPT response):

- Transfer-Encoding: chunked: The server sends data in chunks as they become available.
- Server-Sent Events (SSE): \* Content-Type: text/event-stream
  - Connection: keep-alive
  - Allows the server to "push" data updates to the client over a single long-lived HTTP connection.

### IX. Security Jargon

- SSL (Secure Sockets Layer): The 1990s predecessor. Now considered broken/insecure.
- TLS (Transport Layer Security): The modern standard (TLS 1.2 and 1.3). It sits between the Application layer and Transport layer to encrypt the data.
- HTTPS: HTTP over TLS. It ensures that the "Transcript" of the conversation cannot be read by anyone sitting in the middle (Man-in-the-Middle attacks).


# 6. Routing: Mapping Intent to Logic

Routing is the mechanism that takes an incoming HTTP request and dispatches it to the correct handler function (controller).

## I. Route Anatomy & Types

1. Static Routes
   Fixed paths where the intent is determined by the combination of Path + Method.
   GET /api/books $\rightarrow$ listBooks()
   POST /api/books $\rightarrow$ createBook()

2. Dynamic Routes (Path Parameters)
   Used to identify a specific resource.
   GET /api/users/:id $\rightarrow$ The :id is a placeholder extracted by the router.
   Principle: Path parameters should represent Identity.
3. Query Parameters
   Used for filtering, sorting, or searching.
   GET /api/products?sort=price&limit=10
   Principle: Query params should represent Modifiers of the resource, not the resource itself.

4. Nested RoutesReflects relationships in the data model.
   GET /api/users/123/posts/456 (User 123's Post 456).
   Warning: Deep nesting (more than 2-3 levels) makes APIs brittle and hard to maintain.

## II. Behind the Scenes:

- The RouterHow does a server find the right code among 100+ routes?
  Trie (Prefix Tree): Most high-performance routers (like Gin in Go or Fastify in Node) use a Radixtree/Trie data structure. Instead of checking every string, it traverses a tree character by character, making lookups $O(k)$ where $k$ is the path length.

## III. Versioning & Evolution

- Why: To avoid breaking the mobile app or frontend when you change the database schema.
- Catch-All (404 Handler): A wildcard route \* at the very end of your router file to catch typos and return a clean error.

# 7. (De)Serialization: The Universal Language

Since the frontend and backend often use different memory layouts (e.g., a JavaScript Object vs. a Rust Struct), we need a Wire Format to communicate.

## I. The Process

Serialization: Converting an in-memory object into a byte stream or string (e.g., JSON.stringify()).Network Transfer: Data travels as raw bytes over TCP.Deserialization: Reconstructing the bytes into a language-specific object (e.g., JSON.parse() or serde in Rust).

## II. Formats:

Text vs. Binary

| Format   | Pros                                             | Cons                                                   |
| -------- | ------------------------------------------------ | ------------------------------------------------------ |
| JSON     | Human-readable, standard for Web, easy to debug. | Large size (strings), slow to parse for huge datasets. |
| XML      | Supports complex schemas/validation.             | Very verbose (heavy "tags"), older standard.           |
| YAML     | Human-friendly (config files).                   | Hard to parse programmatically for high-speed APIs.    |
| Protobuf | Binary format. Extremely fast, tiny size, typed. | Not human-readable, requires a .proto definition.      |

## III. Critical First Principles Details

1. The Cost of Serialization
   Serialization is a CPU-intensive task. In high-performance systems (like high-frequency trading), the time it takes to turn an object into JSON can actually be the biggest bottleneck in the request-response cycle.
2. Domain Agnostic vs. Domain Specific
   Domain Specific: A User class in Java has methods, private variables, and logic.
   Domain Agnostic: A JSON string {"id": 1} has no logic; it is just "pure data." Serialization "strips" the logic to move the data.
3. URL Encoding (Percent Encoding)
   Because URLs can only contain a limited set of ASCII characters, special characters (like spaces or emojis) must be serialized.
   Space $\rightarrow$ %20
   First Principle: If you don't deserialize/decode these on the backend, your database queries will fail.


# 8 AuthN & AuthZ

## AuthN: "Who are you?"

The process of verifying the identity of a user, device, or system.

### Evolution

- Mainframes:
  Introduced the concept of Hashing.
  Never store plaintext.
  If a database is leaked, plaintext is a catastrophe; hashes are a math problem.

- 1970s (PKI):
  The birth of Asymmetric Cryptography.
  You use a Public Key to encrypt and a Private Key to decrypt.
  This is the foundation of digital signatures.

- 1990s (MFA):
  - The three pillars of MFA:
    Something you know: Password, PIN.
    Something you have: OTP, Hardware key (Yubikey), Smartphone.
    Something you are: Fingerprint, FaceID, Retina scan.

- 21st Century:
  Zero Trust: "Never trust, always verify." Even if a user is inside the network, every request must be authenticated.
  Passwordless: Using FIDO2/WebAuthn standards to replace passwords with public-key cryptography on the device.

- Future:
  - Decentralized Identity: BlockChain
  - Behavioral Pattern
  - Post Quantum Cryptography

### MUST KNOWS: THE ARCHITECTURAL MODELS

1. Session-Based(Stateful):
   This was the standard for decades.
   - Workflow: User logs in $\rightarrow$ Server creates a session record in the DB (usually Redis for speed) $\rightarrow$ Server sends a SessionID to the client in a Set-Cookie header.
   - Mechanism: The browser automatically attaches this cookie to every subsequent request.Pros: Instant revocation. If you want to log a user out, you simply delete the session from Redis.
   - Cons: Hard to scale. If you have 10 servers, they must all share access to the same Redis instance, or use "Sticky Sessions" (bad for load balancing).

2. JWT-Based(Stateless):
   Standard for modern APIs and Microservices.
   - Anatomy of a JWT:
     Header: Algorithm and token type.
     Payload: Claims (Data). sub (User ID), exp (Expiration), iat (Issued at). NEVER put secrets here; it is Base64 encoded, not encrypted.
     Signature: The most important part. Created by hashing (Header + Payload) with a Secret Key known only to the server.
   - Pros: No database lookup required. The server just verifies the signature. Great for distributed systems.
   - Cons: The Revocation Problem. If a JWT is stolen, it is valid until it expires. You cannot "delete" it because it doesn't live in your database.
   - The Hybrid Fix: Use short-lived Access Tokens (JWTs) for speed and long-lived Refresh Tokens (Stateful/DB) to generate new ones.

3. Cookies: The Transport Mechanism
   A cookie is not an authentication type; it is a storage and transport mechanism.
   - Security Attributes (Critical):
   - HttpOnly: Prevents JavaScript from reading the cookie (Mitigates XSS).
   - Secure: Cookie only sent over HTTPS.
   - SameSite (Strict/Lax): Prevents the cookie from being sent on cross-site requests (Mitigates CSRF).

4. API Key
   - UI:
     User uses platform to send requests etc. It uses APIs to hit server and get data.
   - API:
     Devs want platform server response in confined manner, Platform gives access to server using API Key.
   - Easy to use, Better for Machine 2 Machine Communication

5. OAuth 2.0 & OIDC
   - OAuth 2.0: Delegation (Authorization)
     In OAuth 2.0, there are four distinct roles: _Resource Owner (the user)_, _Client (your app)_, _Authorization Server (Google/GitHub)_, and _Resource Server (the API)_.
     OAuth 2.0 provides a secure way for a user to grant a third-party application limited access to their resources without sharing their password.
     The Grant Types (Methods of getting a token):
     - Authorization Code Flow: (Most Secure) Used by web apps. The client receives a temporary "code" which it then exchanges for an AccessToken via a secure server-to-server call.
     - Client Credentials Flow: Used for Machine-to-Machine (M2M) communication. No user involved (e.g., a Cron job talking to a Payment Gateway).
     - Device Code Flow: Used for devices with limited input (e.g., Smart TVs).
     - The Access Token: This is a string (often a JWT) that acts as a "key" to the Resource Server.

   - OIDC: Identity (Authentication)
     OpenID Connect is an identity layer that sits on top of the OAuth 2.0 framework. It standardizes the way identity information is shared.
     - The ID Token: While OAuth gives you an AccessToken (to do things), OIDC adds an ID Token (to know who someone is).
     - Userinfo Endpoint: Standardized URL where the client can request further profile details (email, profile picture, locale).
     - The "Social Login" Reality: When you click "Login with Google," your app is an OIDC Client. Google verifies the user and sends back an ID Token containing a unique sub (Subject) field. You use this sub as the primary key in your Users table.

## AuthZ: "What you can do?"

Authorization happens after successful Authentication.

TECHNIQUES

- RBAC (Role-Based Access Control): Defined by roles (Admin, Editor, Viewer).
  - Issue: "Role Explosion." If you need an editor who can only edit "Sport" news, you have to create a new role.
- ABAC (Attribute-Based Access Control): Uses attributes (User department, IP address, Time of day).
- ReBAC (Relationship-Based Access Control): Used by Google Drive/Notion. "User A can edit Document B because they are the owner of Folder C which contains Document B."

### Security GOTCHAS

1. User Enumeration
   Wrong: "User not found" or "Password incorrect."
   Fixed: Always use a generic message like: "Invalid username or password."
   - Why? If you say "User not found," an attacker can script requests to your login page to find out which of their stolen email lists have accounts on your platform.

2. Timing Attacks
   A specialized type of Side-Channel Attack.
   - The Problem: Your code might look like this:
     JavaScript
     if (user.password === input.password) { ... }
     The === operator is "short-circuiting." It stops as soon as it finds a mismatch. If the first character is wrong, it returns in 1ms. If the first 10 characters are right but the 11th is wrong, it takes 2ms.
   - The Attack: An attacker measures response times with high precision to guess the password character by character.
   - The Fix:
     Constant Time Comparison: Use crypto.timingSafeEqual() which always checks the full length.
     Simulated Work: If a user is not found, still perform a password hash. This ensures the response time for a non-existent user is the same as for a user with the wrong password.

3. Salt & Pepper (Password Storage)
   Salt: A random string added to a password before hashing. Prevents Rainbow Table attacks (pre-computed hashes).
   Pepper: A secret key stored in the environment (not the DB) added to the hash. If the DB is stolen, the attacker still can't crack passwords without the Pepper from the server config.

### Extras

1. Use Cases:
   Stateful - Web*
   Stateless - APIs*
   OAuth - Third Party Integrations (IDP)
   API Key - Server to Server

2. Status Message:
   For Auth Flow, always use generic message.
   For other flow, you may use specific message.


# 9 10 Validation Controller

# 11 Rest Desig

# 12 Databases

## INTRODUCTION

1. Why? Need for Persistence.
2. What is database? Persistence System that can create, read, update and delete.
3. Types:
   - Disk Based: Hard Disk / SSD - PostGre (Uses a buffer cache in RAM, but the SSD is the "Source of Truth").
   - Memory Based: RAM - Redis (Extremely fast, but volatile—data is lost on power failure unless snapshotted).
4. DBMS (Database Management System):
   - Organization
   - Access - CRUD
   - Integrity (Ensuring data stays valid via constraints).
   - Security

   Why DBMS?
   - Store data simple in Text file.
   - Cons: Parsing Overhead, Unstructured data, concurrency (Handling multiple users writing simultaneously without corruption).

   Types of DBMS:
   - Relational (RDBMS):
   - Stored in form of tables, rows and columns.
   - PreDefined Schema.
   - Data Integrity (ACID Compliance).
   - SQL (Structured Query Language).
   - Example: CMS (Content Management Systems).

   - Non Relational (NoSQL):
   - Stored in form of collections and document.
   - Example: CRM, Real-time feeds.

5. Postgres:
   - OpenSource.
   - SQL based.
   - JSON Support (JSONB).
   - First Choice for most backend engineers.

---

## Postgres

### Queries

```sql
CREATE TABLE <table_name> {
id SERIAL PRIMARY_KEY,
some_smallint SMALLINT,
some_integer INTEGER,
some_bigint BIGINT,
some_decimal DECIMAL (10, 2),
some_real REAL,
some_double DOUBLE PRECISION,
some_char CHAR,
some_varchar VARCHAR(255),
some_text TEXT,
some_boolean BOOLEAN,
some_date DATE,
some_time TIME,
some_timestamp TIMESTAMP,
some_timestampz TIMESTAMZ,
some_interval INTERVAL,
some_uuid UUID,
some_json JSON,
some_jsonb JSONB,
some_array INTEGER[],
some_inet INET,
some_macaddr MACADDR,
some_point POINT,
some_xml XML
}

```

```sql
INSERT INTO TABLE data_types_demo (
some_smallint, some_integer, some_bigint, some_decimal, some_numeric, some_real, some_double, some_char, some_varchar, some_text, some_boolean, some_date, some_time, some_timestamp, some_timestampz, some_interval, some_uuid, some_json, some_jsonb, some_array, some_inet, some_macaddr, some_point, some_xml
)
VALUES
(
32767, -- SMALLINT
214748364, -- INTEGER
9223372836854775887, -- BIGINT
1234.56, -- DECIMAL
98876.56, -- NUMERIC
123.456, -- REAL
123.4567890123456, -- DOUBLE PRECISION
'CHAR10PAD', -- CHAR(10)
'Variable length', -- VARCHAR(255)
'Long text can go here', -- TEXT
TRUE, -- BOOLEAN
'2024-03-14', -- DATE
'15:30:00', -- TIME
'2024-03-14 15:30:00', -- TIMESTAMP
'2024-03-14 15:30:00+00', -- TIMESTAMPZ
'2 years 3 months 4 days', -- INTERVAL
'a0eebc99-9c0b-4ef8-bb6d-6bb9hkhkh3a11', -- UUID
'{"name": "John", "age": "30"}', -- JSON
'{"name": "John", "age": "30"}', -- JSONB
ARRAY[1,2,3,4,5], -- INTEGER[]
'192.168.1.1', -- INET
'08:00:2b:01:02:03', -- MACADDR
'(10.5, 20.5)', -- POINT
'<root><element>some xml</element></root>' -- XML
);

```

### Data types

- INTEGER: Standard 4-byte integer.
- SMALLINT: 2-byte, smaller range.
- BIGINT: 8-byte. Mentor Tip: Use BIGINT for Primary Keys to avoid ID exhaustion in large systems.
- DECIMAL / NUMERIC: Store in xx.yy format, better to use when accuracy matters (e.g., Financial transactions).
- REAL / DOUBLE: Floating point. Warning: Do not use for money due to rounding errors.
- CHAR: Adds empty spaces if length not reached, only use if same length (e.g., Country Codes).
- VARCHAR: Variable length. 255 is an old convention; not strictly required in Postgres.
- TEXT: Unlimited length. In Postgres, TEXT and VARCHAR have the same performance.
- TIMESTAMPZ: Store timestamp with timezone. Mentor Tip: Always use this for global apps.
- JSONB: JSON Binary. Compressed and indexed. Much faster than standard JSON for reads.
- ENUM: Specific types used instead of free text to ensure data consistency.

---

### MIGRATIONS

- Structure: Folder `db > migrations > files` with extension `.sql`.
- CLI Tools: `dbmate`, `go-migrate`.
- Case: Changes were made to current db schema.
- Up migrations: Tracks latest changes (CREATE/ALTER).
- Down migrations: Used for revert (DROP/ROLLBACK).

Why need?

1. Tracking DB Schema changes across team members.
2. Version Control for your database.
3. Reliable Roll Backs.

---

### CONSTRAINTS

- REFERENCES (Referential Integrity): Ensures a row in one table points to a valid row in another.
- ON DELETE Actions:
- RESTRICT: Stop the parent from being deleted if children exist.
- CASCADE: Delete the parent, and all related children are automatically deleted.
- SET NULL: If parent is deleted, set child reference to NULL.
- SET DEFAULT: Set child reference to a default value.

---

### DB DESIGN

PROJECT MANAGEMENT SYSTEM

migration.sql

UP MIGRATION:

- ENUMS: `project_status`, `task_status`, `member_role`.
- TABLES:
- `users`
- `user_profiles` (1:1 with users - uses `user_id` as both FK and UNIQUE).
- `projects`
- `tasks` (1:Many with projects - task table has `project_id`).
- `project_members` (Many:Many linking table with `project_id` and `user_id`).

DOWN MIGRATION:

- DROP: `DROP TABLE IF EXISTS <tables>`, `DROP TYPE IF EXISTS <types>`.

Relationship Differences:

- 1:1: We typically use the same ID or a unique foreign key.
- 1:Many: The "Many" side holds a Foreign Key to the "One" side's Primary Key.
- Many:Many: Requires a junction table. The Primary Key is usually a composite: `{project_id, user_id}`.

Testing data:

- Seeding: Filling data for testing/development.
- CTE (Common Table Expression): A temporary result set defined using `WITH` that you can reference within a SELECT, INSERT, UPDATE, or DELETE.

---

### SQL

Order of Execution:

1. FROM / JOIN
2. WHERE
3. GROUP BY / HAVING
4. SELECT
5. ORDER BY / LIMIT

Ex 1: Get users

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
ORDER BY u.created_at DESC;

```

Parameterized Query: Prevents SQL Injection. The input is treated as a string, not executable code. Expressed as `:parameter_name`.

Ex 2: Get user by id

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
WHERE u.id = :userId
ORDER BY u.created_at DESC;

```

Ex 3: Get User by query params

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
WHERE u.full_name ILIKE :letter || '%'
ORDER BY :sortBy :sortOrder
OFFSET :page
LIMIT :limit;

```

Ex 4: Create user

```sql
INSERT INTO users (email, full_name, password_hash)
VALUES (:email, :full_name, :password_hash)
RETURNING *; -- Returns the newly created row (including generated ID)

```

Ex 5: Update User

```sql
UPDATE user_profiles
SET bio = :bio, phone = :phone
WHERE user_id = :user_id
RETURNING *;

```

---

### TRIGGERS

Update fields such as `updated_at` automatically.

Function:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_At = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'pgsql';

```

Trigger:

```sql
CREATE TRIGGER update_users_updated_at
   BEFORE UPDATE ON users
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();

```

---

### INDEXING

Database default: Sequential scan (reads every single row) $O(n)$.
Index: Uses a B-Tree / B+ Tree to store sorted pointers to rows $O(\log n)$.

Trade-offs:

- Write Penalty: Slower INSERT/UPDATE/DELETE (Index must be updated).
- Disk Space: Indexes take up storage.

Criteria for indexing:

- Columns used in `WHERE` clauses.
- Columns used in `JOIN` conditions.
- Columns used for `ORDER BY`.

Maintains:

- Lookup table.
- Order (Default: ASC or DESC).

Create Indexes:

```sql
CREATE INDEX idx_users_email on users(email);
CREATE INDEX idx_users_created_at on users(created_at);

```

---

### NOTE

- POSTGRES is case sensitive for unquoted identifiers in some contexts but treats them as lowercase. Recommendation: Stick to `snake_case` and lowercase for everything.
- Primary Key is automatically indexed by the database using a B-Tree.


# 13. Caching

Caching is the mechanism of keeping a subset of primary data in a location that is faster and easier to access, thereby decreasing the time and effort required for an operation.

## I. Real-World Examples

- Google Search: Uses a distributed in-memory cache system spread across the globe. Without it, Google would have to recompute ranking and indexing for millions of identical queries (e.g., "weather today"), leading to massive latency .
- Netflix: Uses CDNs (Content Delivery Networks) to store movies at Edge Locations geographically closer to users. This avoids sending terabytes of data from a central US server to global users, which would cause heavy buffering .
- X (Twitter): Analyzing billions of tweets for the "Trending" section is computationally expensive. Twitter computes these trends every few minutes and stores the result in an in-memory store like Redis.

## II. Levels of Caching

1. Network Level
   CDN (Content Delivery Network): Caches static assets (images, videos, HTML/CSS/JS) at PoPs (Points of Presence)—collections of edge servers in a specific region.
   DNS Caching: Crucial for resolving domain names to IP addresses without traversing the entire recursive tree every time.
   Browser/OS Cache: First check is local .
   Recursive Resolver: Provided by ISP/Google/Cloudflare; caches results to skip root/authoritative servers .

2. Hardware Level
   L1/L2/L3 Cache: Located directly on CPU chips to store repeated computations.
   Predictive Algorithms: CPUs use these to load sequential data (like arrays) into cache before they are even requested.

3. Software Level (In-Memory Databases)
   Technologies: Redis, Memcached, AWS ElastiCache.

   The "Why": They store data in RAM (Main Memory) instead of disks.
   Mechanical vs. Electrical: Disk-based storage requires mechanical movement (heads revolving), while RAM uses electrical signals and capacitors to access memory addresses directly.
   Trade-off: RAM is fast but volatile (data clears when power is lost) and has limited capacity.

## III. Key Technical Concepts

1. Caching Strategies
   - Lazy Caching (Cache-Aside): The server only caches data after it is requested and missed in the cache. Pro: Saves space. Con: Initial request is slow.
   - Write-Through: Updates both the database and the cache simultaneously during write operations (PUT/POST/PATCH). Pro: Cache is always fresh. Con: Higher write overhead.

2. Eviction Policies
   When the cache (RAM) is full, we must decide what to delete to make room:
   - No Eviction: Returns an error when memory is full.
   - LRU (Least Recently Used): Deletes the data point that hasn't been accessed for the longest time .
   - LFU (Least Frequently Used): Deletes the data point with the lowest total count of accesses .
   - TTL (Time To Live): Automatically invalidates keys after a set duration .

## IV. Primary Backend Use Cases

1. DB Query Caching:
   - Compute Intensive: Cache results of complex SQL JOINs or aggregations.
   - Read-Heavy/Static: E-commerce product details (MacBook specs) or celebrity profiles that get millions of hits but change rarely
2. Session Management: Storing authentication tokens in Redis allows every API request to verify the user in microseconds without hitting the main database .
3. API Caching: Caching external API responses (e.g., Weather API) to save on billing costs and avoid hitting third-party rate limits
4. Rate Limiting:
   - Sits as a Middleware using a header like X-Forwarded-For to identify user IPs.
   - Stores a "counter" in Redis. If a user exceeds X requests per minute, the middleware blocks them with a 429 Too Many Requests status code.
   - Why Redis? Doing this in a relational DB would add 20-30ms of latency to every request and flood the DB with rate-limit checks .


# 14 Task Queues and Background Jobs

Task queues allow a backend to handle expensive, slow, or unreliable operations without making the user wait for a response.

## I. The "Why": From Synchronous to Asynchronous

In a Synchronous (Blocking) flow, the User Signup request must wait for the Email API (Resend/Brevo) to respond.

- Risk: If the Email API takes 5 seconds or fails, the user’s signup hangs or crashes, even though the database record was created successfully.
- Solution: Offloading. The backend performs the "must-do" work (DB write) and offloads the "eventually-do" work (Email) to a background process.

## II. The Architecture (Producer-Broker-Consumer)

1. Producer (The API Server)
   - Serialization: Converts the task data into a format like JSON or Protobuf.
   - Push: Sends the "job" to the Broker.
   - Immediate Response: Returns a 202 Accepted or 200 OK to the user immediately.

2. Message Broker (The Queue)
   - Technologies: Redis (used by BullMQ/Sidekiq), RabbitMQ, AWS SQS.
   - Durability: Ensures that even if the broker restarts, the tasks aren't lost (persisted to disk).

3. Consumer/Worker (The Execution Engine)
   - Runs as a separate process or on a separate server entirely.
   - Polling/Pub-Sub: Constantly watches the queue for new tasks.
   - Acknowledgment (ACK): The worker tells the queue "I am finished" so the queue can safely delete the task.

## III. Core Technical Concepts

1. Visibility Timeout & Acknowledgement
   - When a Consumer picks up a task, the Broker "hides" it from other consumers for a set period (e.g., 30 seconds).
   - If the Consumer fails to send an ACK (e.g., the server crashed), the Visibility Timeout expires, and the task becomes visible again for another worker to try. This ensures At-least-once delivery.

2. Retries and Exponential Backoff
   - If a 3rd party service is down, don't retry immediately (which might worsen the outage).
   - Exponential Backoff: Wait 1s, then 2s, then 4s, then 8s...
   - Dead Letter Queue (DLQ): If a task fails $X$ times, move it to a special "Dead Letter" queue for manual inspection by an engineer.

3. Idempotency (Critical)
   - Principle: If a task runs twice, the result should be the same as if it ran once.
   - Example: If a "Send Invoice" task retries, check if the "invoice_sent" flag is already TRUE in the DB before sending another email.

## IV. Task Types & Use Cases

| Task Type           | Examples                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| One-off             | Verification emails, password resets.                                                              |
| Recurring (Cron)    | Daily database backups, monthly billing reports, clearing expired sessions.                        |
| Chained (Workflows) | Video Upload $\rightarrow$ Transcoding $\rightarrow$ Thumbnail Gen $\rightarrow$ Notify Followers. |
| Batch               | Processing a CSV upload with 10,000 rows.                                                          |

## V. Design Considerations for Backend Engineers

- Ordering: Standard queues are FIFO (First-In, First Out), but in distributed systems, exact ordering can be hard. Use Message Groups if sequence matters.

- Scaling: If the "Queue Length" is growing, use Autoscaling up to spin up more Worker containers.

- Monitoring (The "Pulse"):
  - Queue Depth: How many jobs are waiting?
  - Failure Rate: What percentage of jobs are hitting the DLQ?
  - Processing Time: How long does a job take once picked up?

- State Management: Workers should be stateless. They should get all the data they need from the task payload or primary database.

## VI. Best Practices

1. Keep Payloads Small: Don't put a whole 5MB image in the queue; put the S3 URL of the image in the queue and let the worker fetch it.
2. Atomic Commits: Ensure the task is only added to the queue after the database transaction is committed.
3. Graceful Shutdown: Ensure workers finish their current job before the process is killed during a deployment.

Example:

User signs up on frontend and backend sends verification mail to email id.

How to handle this?

Activity offloaded to Background Job:
For sending mail to user, we use resend/brevo.
Form HTML template and make api call to Third party services and sends response back to backend.

Issues:
Third Party Email fails which causes signup to fail.

Solution:
Rather than sync flow, Service serializes data in JSON format and packages it to Queue.
Consumer(Worker): They take out tasks from queue
Diff consumer pick diff type of tasks from diff queue (mail, push notifications).

Then we add handler to deserialize and process request.
If 3rd party is down, consumer process fails. We can use retries (exponential backoff) using BullMQ and max amount of retries.

Use Cases:

1. Sending Emails
2. Processing Images/Videos
3. Generating Reports
4. Sending Push notifications (When we install, device is registered under push notifications service, backend sends call to operating system of device and it makes to you.)

## Task Queue

Managing and distributing background jobs.

Core Idea:

Producer: Creates Task and pushes to queue.
Queue (Broker)
Consumer: Runs in different process; picks out and processes.Sends ack back to queue.
Ex: RabbitMQ, Redis: Pub-Sub, SQS
Visbility Timeout - Queue makes task available to other consumer/worker.

Types of Tasks:

One-off tasks: Email - Welcome, Verification
Recurring tasks: Send monthly, quarterly reports.
Chained Tasks: LMS - Udemy: Upload video, Create Thumbnail, generate transcription
Batch Tasks: Delete account

Design Considerations:

Idempotency - Design task such that retries must be from scatch
Error handling - Diff Process, must be goood
Monitoring - Tasks in queue, failed, job (Metrics -> Grafana Dashboard)
Scaling -
Ordering -
Rate Limiting -

Best Practices:
Keep Tasks small and focused (Single Responsible)
Avoid Long running tasks
Use Proper Error handling and logging
Monitor queue length and worker health




# Extra

## 🔐 OAuth Authentication

Allow users to securely log in to your app using third-party providers like Google or GitHub.

---

### 🔄 OAuth Flow Overview

```
User → [Your App] 
     → (Redirect to Google) 
     → Google Login → [Authorization Code]
     → [Your Server] ↔ (Exchange for Access Token)
     → [Fetch User Info] → [Issue Your JWT] → [Frontend]
```

---

### ✅ Google OAuth Setup Guide

#### 1. Enable Required APIs

* Go to Google Cloud Console → APIs & Services → Library
* Enable the following API:

  * Google People API

---

#### 2. Configure OAuth Consent Screen

* Go to OAuth Consent Screen in the Google Cloud Console
* Select "External" as the user type
* Fill in the following details:

  * App name, support email, developer contact info
  * Add scopes such as `email` and `profile`
* Add your test users (Google accounts)
* Save changes (no need to publish for development mode)

---

#### 3. Create OAuth 2.0 Credentials

* Navigate to Credentials → Create Credentials → OAuth Client ID

* Choose Web Application as the application type

* Add your Authorized Redirect URI (for development):

  ```
  http://localhost:3000/auth/google/callback
  ```

* After creation, note down your:

  * `GOOGLE_CLIENT_ID`
  * `GOOGLE_CLIENT_SECRET`

---

#### 📌 What Is a Redirect URI?

> The Redirect URI is the URL on your server where Google will send the user after authentication.
> Your backend must listen on this path to receive the authorization code.

✅ Example:

```
http://localhost:3000/auth/google/callback
```

---

### 🧩 Code Integration Steps

### 1. Redirect to Google for Login

Initiate the login process by redirecting the user to Google’s OAuth URL to request access permissions.

### 2. Handle Callback and Retrieve User Info

* After the user authorizes, Google will redirect to your backend with an authorization code
* Exchange this code for an access token
* Use the token to fetch the user's basic profile data (e.g., name, email, avatar)
* Generate your own JWT for the authenticated user and send it to the frontend for session management