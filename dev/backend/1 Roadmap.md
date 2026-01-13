# 🗺️ Backend Engineering from First Principles

Goal: To build reliable, scalable, fault-tolerant, and maintainable systems, moving beyond basic CRUD APIs.

## 🟢 I. Foundational Concepts

Status: ⬜ Not Started | 🟦 In Progress | ✅ Completed

[⬜] High-Level Understanding

- Request flow: Browser → Server → Response.

[ ] HTTP Protocol Deep Dive

- Headers, Methods (GET, POST, etc.), and Status Codes.
- CORS (Simple vs. Pre-flight).
- Caching (ETags, Max-Age).
- Versions (HTTP/1.1, 2.0, 3.0) and Security (TLS/SSL).

[ ] Routing

- Static, Dynamic, and Regex-based routes.
- API Versioning & Route Grouping.

[ ] Serialization & Deserialization

- Formats: JSON/XML vs. Binary (Protobuf).
- Security: Validation before deserialization.

[ ] Authentication & Authorization

- State (Sessions) vs. Stateless (JWT).
- Models: RBAC, ABAC, ReBAC.
- Security: Hashing, Salting, CSRF/XSS protection.

[ ] Validation & Transformation

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

[ ] Databases (17:08)

- ACID properties and CAP Theorem.
- Relational vs. NoSQL.
- Indexing and Query Optimization.

[ ] Caching Strategies (18:51)

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
