# 🗺️ Aman's Engineering Roadmap

> **Goal**: Transition from SAP CPI Middleware → Product Company Backend Engineer (Java/Spring Boot)
> **Target Timeline**: Mid-2026 (post bond)
> **Target Roles**: Backend SDE-2 at product companies (Fintech / HCM SaaS preferred)

---

## 📍 Current Status — Mar 2026

| Area                  | Status              | Notes                               |
| --------------------- | ------------------- | ----------------------------------- |
| Java + Spring Boot    | 🔄 Learning         | Shreyansh Jain Udemy course         |
| Node.js / TS          | ✅ Production-ready | Used in Kizo, internships           |
| DSA                   | 🔄 In Progress      | A2Z sheet, LeetCode ~1000+ solved   |
| System Design (HLD)   | 🔄 Early            | Reading Grok SD                     |
| LLD / Design Patterns | 🔄 Early            | codewitharyan.com                   |
| PostgreSQL            | 🔄 Intermediate     | Used in Kizo with row-level locking |
| Docker / GCP          | ✅ Used in Kizo     | Needs deeper K8s knowledge          |
| CP (C++/JAVA)         | ✅ Maintained       | Not primary focus anymore           |

---

## 🎯 Phase 1 — Mar 2026 → Jun 2026 (Foundation)

### Primary: Ship Payroll Engine in Spring Boot

- [ ] Project setup — Spring Boot 3.x, PostgreSQL, Docker
- [ ] Multi-tenant architecture (multiple vendors/companies)
- [ ] Employee & payroll data modeling
- [ ] Payroll calculation engine (gross → deductions → net)
- [ ] Indian tax compliance (PF, ESI, PT, TDS — old vs new regime)
- [ ] Scheduled payroll runs (`@Scheduled` / Quartz)
- [ ] PDF payslip generation
- [ ] RBAC — HR / Employee / Finance roles
- [ ] Audit trail — every state change logged
- [ ] Redis — distributed locking for payroll runs
- [ ] 80%+ test coverage (unit + integration)
- [ ] OpenAPI/Swagger documentation
- [ ] Deploy: Docker + Railway/Render (keep live)

### DSA — TakeUforward A2Z Sheet

- [ ] Arrays & Hashing
- [ ] Two Pointers & Sliding Window
- [ ] Binary Search
- [ ] Linked Lists
- [ ] Stacks & Queues
- [ ] Trees & BST
- [ ] Heaps / Priority Queues
- [ ] Graphs (BFS, DFS, Dijkstra, Topo Sort)
- [ ] Dynamic Programming
- [ ] Greedy

> ⚠️ **Practice all DSA in Java**, not C++. Every problem = Java Collections practice.

### LLD — Design Patterns (Java)

- [ ] SOLID Principles — implemented examples
- [ ] Creational: Singleton, Factory, Builder
- [ ] Structural: Adapter, Decorator, Proxy
- [ ] Behavioral: Strategy, Observer, Command, Iterator
- [ ] LLD Case Studies: Parking Lot, Library System, Splitwise

### Core CS (cs-repo)

- [ ] DBMS: Indexes, Query Plans, Transactions, MVCC, Isolation Levels
- [ ] OS: Threads, Locks, Semaphores, Deadlocks, Virtual Memory
- [ ] CN: TCP/IP, HTTP/2, WebSockets, DNS, Load Balancers
- [ ] OOP: Deep Java — Generics, Reflection, Collections internals

---

## 🎯 Phase 2 — Jun 2026 → Sep 2026 (Depth + Interview Prep)

### System Design (HLD)

- [ ] Grok SD — complete (started Phase 1, finish here if pending)
- [ ] _Designing Data-Intensive Applications_ — Kleppmann, 1 chapter/week
- [ ] Alex Xu — System Design Interview Vol 1 (after DDIA chapters 1–6)
- [ ] Alex Xu — System Design Interview Vol 2 (after DDIA complete)
- [ ] Practice designing independently: URL Shortener, Rate Limiter, Notification Service, Payment System, Pastebin
- [ ] Deep dives: Kafka basics, Redis pub/sub, CDN, Consistent Hashing, Leader Election

### Spring Boot — Go Deeper

- [ ] Spring Security internals (filter chain, OAuth2 resource server)
- [ ] JPA/Hibernate — N+1 problem, lazy vs eager, query optimization
- [ ] Spring Batch — for payroll processing
- [ ] gRPC basics (inter-service communication)
- [ ] Actuator + Micrometer (observability — connects to your SAP CPI work)

### DevOps

- [ ] Kubernetes fundamentals (pods, services, deployments, ingress)
- [ ] AWS basics — EC2, RDS, S3, SQS, Lambda
- [ ] CI/CD deeper — GitHub Actions pipelines for Java

### Mock Interviews

- [ ] Start Pramp / Interviewing.io sessions
- [ ] 2x mock interviews/week (1 DSA, 1 System Design)
- [ ] Revise Kizo + Payroll Engine to explain end-to-end clearly

---

## 🎯 Phase 3 — Sep 2026 → Dec 2026 (Job Search)

### Applications — Target Companies

| Company                      | Why                             | Domain Fit               |
| ---------------------------- | ------------------------------- | ------------------------ |
| Razorpay / Cashfree / Juspay | Fintech, strong backend culture | Kizo + Payroll Engine    |
| Darwinbox / Keka / GreytHR   | HCM/Payroll SaaS                | SAP CPI domain knowledge |
| Postman / Browserstack       | Product eng, developer tools    | Strong backend needed    |
| Gojek / Meesho / PhonePe     | Scale, distributed systems      | Java + infra depth       |
| Intuit India                 | HCM, Tax, Fintech overlap       | Perfect domain match     |

### Resume Checkpoints Before Applying

- [ ] Payroll Engine live with README + architecture diagram
- [ ] Kizo repo cleaned up with clear documentation
- [ ] Resume updated: Spring Boot project prominent
- [ ] SAP CPI role reframed around engineering problems, not tools
- [ ] GitHub learnSpace shows consistent commit history

---

## 📚 Resources — Sequenced Learning Path

> Follow in order. Don't jump ahead. Finish before moving on.

### 🟢 Stage 1 — Active Now (Phase 1: Mar → Jun 2026)

| #   | Resource                               | Area                  | Exit Condition                                               |
| --- | -------------------------------------- | --------------------- | ------------------------------------------------------------ |
| 1   | Shreyansh Jain — Spring Boot (Udemy)   | Java / Spring Boot    | Payroll Engine shipped                                       |
| 2   | TakeUforward A2Z Sheet                 | DSA (in Java)         | All topics covered                                           |
| 3   | codewitharyan.com                      | LLD / Design Patterns | 5 case studies implemented in Java                           |
| 4   | **Grok System Design Interview (PDF)** | HLD — starting point  | All 16 problems attempted independently first, then compared |

> 📌 **How to use Grok SD**: Read Part 1 (fundamentals) fully first. Then for each design problem — attempt it yourself on paper before reading the solution. Don't just read it passively.

### 🔵 Stage 2 — Phase 2 (Jun → Sep 2026)

| #   | Resource                                            | Area                            | Exit Condition                            |
| --- | --------------------------------------------------- | ------------------------------- | ----------------------------------------- |
| 5   | _Designing Data-Intensive Applications_ — Kleppmann | HLD depth / Distributed Systems | 1 chapter/week, all 12 chapters           |
| 6   | Alex Xu — _System Design Interview Vol 1 + 2_       | HLD interview patterns          | All problems designed independently first |

> 📌 **Why DDIA before Alex Xu Vol 2**: DDIA gives you the _why_ behind distributed systems. Alex Xu gives you the _interview pattern_. In that order, Xu's problems become deeply intuitive — not memorised.

### 🟣 Stage 3 — Phase 3 (Sep → Dec 2026)

| #   | Resource                     | Area                            | Exit Condition                            |
| --- | ---------------------------- | ------------------------------- | ----------------------------------------- |
| 7   | Alex Xu — _Coding Interview_ | DSA patterns + company-specific | After A2Z complete, use Xu to fill gaps   |
| 8   | Head First Design Patterns   | LLD supplement                  | Read alongside building, not in isolation |

> 📌 **Alex Xu Coding Interview** is best used _after_ A2Z — not as a replacement. A2Z builds fundamentals. Xu sharpens interview-specific patterns and gives company-wise problem sets.

---

## 🏗️ Projects

| Project                                              | Stack                                        | Status         | Live       |
| ---------------------------------------------------- | -------------------------------------------- | -------------- | ---------- |
| [Kizo — Digital Wallet](https://github.com/JDevAman) | Node.js, TS, PostgreSQL, Redis, Docker, GCP  | ✅ Complete    | ✅ Yes     |
| Payroll Engine                                       | Java, Spring Boot, PostgreSQL, Redis, Docker | 🔄 In Progress | ⬜ Pending |

---

## 📈 Progress Tracker

### DSA (LeetCode)

- Solved: ~1000+
- Peak Rating: >1650
- **Next milestone**: 1250 solved, consistent mediums in Java

### CP

- CodeChef Starters 139 — Rank 524 (Div 3)
- **Status**: Maintain, not primary focus

---

## 💡 Principles to Stay On

1. **Build over consume** — every concept needs a code artifact in this repo
2. **Java for everything forward** — DSA, projects, practice. Drop C++ for new work.
3. **Depth over breadth** — finish before starting something new
4. **One live project at all times** — recruiters click links
5. **Consistency > intensity** — 1 hour daily beats 8 hours on weekends

---

## 🔗 Profiles

- GitHub: [JDevAman](https://github.com/JDevAman)
- LinkedIn: [Linkedin/Aman](https://linkedin.com/in/aman)
- LeetCode: Track weekly
- Email: amankr.24b@gmail.com

---

\_Last updated: March 2026
