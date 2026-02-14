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
