# Testing

This project follows a **layered testing strategy**.  
Each layer is tested **once**, using the **right type of test**, to avoid duplication and slow test suites.

---

## Unit Tests

**Purpose**  
Verify **business logic in isolation**.

**What we test**

- Service layer (`*.service.ts`)
- Pure functions (no I/O)
- All success and failure paths

**What we mock**

- Database (repositories)
- Crypto utilities (argon2)
- UUID and token generators
- External services

**What we don’t test**

- HTTP layer
- Prisma queries
- Express routing

**Tools**

- **Vitest** (primary)
- Coverage via `@vitest/coverage-v8`

**Examples**
auth.service.ts
wallet.service.ts

**Characteristics**

- Very fast
- Deterministic
- No network or database access

---

## Integration Tests

**Purpose**  
Verify **HTTP behavior and wiring** between layers.

**What we test**

- Controllers and routes together
- Request validation
- HTTP status codes
- Cookie handling (set / clear)
- Error to response mapping

**What we mock**

- Database at repository level (or use a test database)
- External services

**What we don’t test**

- Business logic (already covered by unit tests)

**Tools**

- Supertest
- Vitest

**Examples**

POST /auth/signup
POST /auth/signin
POST /auth/refresh
POST /auth/logout

**Characteristics**

- Slower than unit tests
- Uses a real Express app
- No browser involved

---

## End-to-End (E2E) Tests

**Purpose**  
Verify **real user flows** across the full system.

**When**

- After frontend is ready

**What we test**

- Signup → login → actions → logout
- Real cookies and sessions
- Real database
- Real API calls

**What we don’t mock**

- Nothing (except third-party APIs)

**Tools**

- Playwright (planned)

**Characteristics**

- Slowest tests
- Highest confidence
- Run less frequently

---

## Test Coverage

- Coverage enforced via thresholds
- Infrastructure files (Prisma client, config) are excluded
- Focus is on **meaningful coverage**, not 100%

**Current Targets**

- Lines ≥ 80%
- Functions ≥ 80%
- Branches ≥ 70%

---

## Testing Philosophy

- Test **behavior**, not implementation
- Avoid testing the same behavior at multiple layers
- Prefer fewer, high-value tests over many shallow tests
- Fast tests run often, slow tests run less

---

## Test Types Summary

| Layer               | Test Type          | Required |
| ------------------- | ------------------ | -------- |
| Service             | Unit               | Yes      |
| Controller + Routes | Integration        | Yes      |
| Repository          | Integration (rare) | No       |
| Frontend + Backend  | E2E                | Later    |

---

## Notes

- This is my first project with a serious testing setup.
- Tests were written incrementally while learning best practices.
- The goal is **confidence and maintainability**, not just coverage numbers.
