# 13. Caching: From First Principles

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
