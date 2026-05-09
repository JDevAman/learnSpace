# HLD DUMP

1. System Design Topics

- Scalability:
  [MIT Lecture](https://www.youtube.com/watch?v=-W9F__D3oY4)

1. Must Know: The Architectural Core

- Scalability: The "How" of Growth
  - Vertical Scaling: Increasing a single machine's power (RAM/CPU/NVMe).
    - Constraint: High cost, hardware ceiling, and acts as a SPOF (Single Point of Failure).
  - Horizontal Scaling: Adding more smaller machines.
    - Requirement: Requires a Load Balancer to manage the pool.
  - DNS (The Entry Point): Resolves Domain → IP.
    - Mechanism: Browser → OS Cache → Router → ISP/Internet → DNS. Returns IP of Server 1 (or the Load Balancer).
    - Caching: Occurs at Browser/OS layer with a defined TTL (Time to Live).

- Load Balancing & The Session Problem
  - Purpose: Distributes requests across servers to prevent any one server from being overwhelmed.
  - The "Alice" Case Study (Sticky Sessions): \* If Alice is sent to Server 1 and starts a session, she must return to Server 1 for subsequent requests.
  - Ways to solve this:
    - Sticky Sessions: The Load Balancer remembers Alice (via IP or Cookie) and always routes her to the same server.
    - Cookies: LB sets a cookie so the user "sticks" to a server. Downside: If users disable cookies, this fails.
    - Shared Storage (iscsi): Data is replicated across servers so it doesn't matter which one Alice hits.
  - The "Hard Disk in LB" Theory: \* Why we don't do it: Putting the session data on the LB's disk makes the LB a SPOF. If the LB dies, all sessions for every user die.

- Database Replication & Scaling
  - Master-Slave: Best for Read-Heavy apps. Writes go to Master; Slaves sync for Reads.
  - Master-Master: High availability for writes, but very complex to keep in sync.
  - Partitioning/Sharding: Splitting data into clusters (e.g., User A-M on Cluster 1, N-Z on Cluster 2).
  - High Availability (HA): Pair of servers (Active-Active or Active-Passive) measuring each other's "pulse" (Heartbeat).

2. Good to Know: Implementation & Optimization

- Caching Strategies
  - File-Based Caching: Like Craigslist (sending static .html). Fast, but hard to edit and consumes space.
  - Database Caching: MySQL Query Cache (query_cache=1). Caches result if the row hasn't changed.
  - In-Memory Caching (Memcached): Developed by Facebook. Stores data in RAM.
    - Constraint: RAM is finite; requires Eviction Policies like LRU (Least Recently Used) or LFU (Least Frequently Used).
  - PHP Acceleration: Caching the Opcode (the interpreted version of the script) so the server doesn't have to re-read/re-interpret the code on every request.

- Reliability (RAID - Redundant Array of Independent Disks)
  - RAID 0: Split/Striping (Speed, No Redundancy).
  - RAID 1: Mirroring (Copy of data, High Redundancy).
  - RAID 5: Splitter + 1 disk for Redundancy.

- Security & Protocols
  - SSL Termination: The Load Balancer handles the heavy decryption of SSL (HTTPS), then passes unencrypted (HTTP) traffic to internal servers to save their CPU.
  - Principle of Least Privilege: Only open necessary ports (80/443 for Web, 22 for SSH, 3306 for SQL).
  - SFTP vs. FTP: Always use SFTP. FTP sends passwords in plaintext; SFTP is encrypted.

3. Facts: Definitions & Industry Standards
   - Public vs. Private IP: Private is local (LAN); Public is for the Internet.
   - IP Versions: IPv4 (32-bit) is the old standard; IPv6 is the modern, larger address space.
   - Web Hosts (e.g., GoDaddy): Provide features like Network Blocking and VPS.
   - VPS vs. Shared: VPS uses a Hypervisor to split one powerful server into multiple virtual ones. Shared means multiple clients share the same OS.
   - Storage Hardware: Mechanical (SATA/SAS) vs. Solid State (NVME).
   - LB Software: Elastic Load Balancer (AWS), HAProxy.
   - LB Hardware: Barracuda, Cisco, Citrix (Very expensive).
   - DB Engines: InnoDB (Supports Transactions), Archive Storage Engine (Good for compressed logs, slow to query).

   graph LR
   User((User)) -- DNS Resolve --> LB{Load Balancer}
   LB -- Sticky --> S1[Server A]
   LB -- Sticky --> S2[Server B]
   S1 & S2 -- Cache Aside --> Mem[(Memcached)]
   S1 & S2 -- ACID --> M[(DB Master)]
   M -- Replication --> Sl[(DB Slave)]

## CASE STUDIES

### Engineering for 1 Million Requests Per Second (RPS)

For more details: https://www.youtube.com/watch?v=W4EwfEU8CGA
This is the realm of "Systems Engineering" - managing the movement of electrons across hardware.

#### I. The Critical Bottlenecks

1. Hardware Constraints:
   - Compute (CPU): The bottleneck is often the overhead of context switching and interrupt handling.
   - Network (NIC): A standard 10Gbps card will saturate at ~40k RPS if payloads are large. For 1M RPS, you require
     100Gbps+ or Elastic Network Adapters (ENA).
   - Memory (RAM): The only storage medium fast enough for real-time processing. Disk I/O is effectively "dead" at this
     scale.

2. Software & Stack:
   - The Runtime Trap:
     - Node.js/Python: Excellent for I/O-bound tasks, but the Garbage Collector (GC) and
       single-thread event loop become bottlenecks at extreme scales.
     - C++/Rust (Drogon/Axum): Used when you must
       eliminate the overhead of a virtual machine or interpreter to save CPU
       cycles.

   - Bad Engineering Practices:
     - O(n) Operations: COUNT(\*) or ORDER BY RANDOM() on 10M+ rows will hang the DB for seconds. At 1M RPS, you only
       use O(1)or O(log n) operations.
     - Inefficient Serialization: JSON parsing is CPU-intensive. High-performance
       systems use Protobuf or FlatBuffers.

#### II. Performance Measurements:

Never assume, always measure. Use the Concurrency Formula to understand the
load:$$\text{Total Concurrent Requests} = \text{Connections} \times \text{Pipelining}$$

- Pipelining: Sending multiple requests over a single connection without waiting for individual responses. This
  saturates the "wire" and tests the server's limit.
- Latency vs. Throughput: You must measure the p99 latency (the time it takes for the slowest 1% of requests). A high
  RPS is useless if the latency is 10 seconds.

#### III. Architectural Solutions

1. Redis Cluster (Memory Sharding)
   Why: A single Redis instance is single-threaded. To reach 1M RPS, you must shard data across a cluster.
   Mechanism:
   Data is distributed across 16,384 Hash Slots.
   Clients use a hashing algorithm on the key to determine which node to talk to.
2. Async Write-Back Pattern
   The Flow: User Request $\rightarrow$ API $\rightarrow$ Redis (Queue/Cache) $\rightarrow$ Immediate Response (202
   Accepted).
   The Sync: A background worker pulls data from Redis and performs Batch Inserts (e.g., 5,000 rows at once) into the
   persistent SQL Database. This protects the DB from "Write Exhaustion."
3. Scaling Strategies
   Horizontal Scaling: Preferred for availability. Requires a Network Load Balancer (NLB).
   Load Balancer Warm-up: Cloud load balancers often need to be "pre-warmed" or reserved to handle sudden spikes to 1M
   RPS; otherwise, the LB itself becomes the bottleneck.
4. Advanced Tuning
   Interrupt Moderation: Tuning the OS kernel to handle the flood of network packets without context-switching the
   CPU to death.
   Zero-Copy Networking: Reducing the number of times data is copied between the kernel and the application memory.

### KIZO (Personal App)

- Argon2 is causing CPU Bottleneck. Should use env (UV_THREADPOOL_SIZE=1024).
- Microservices to be used to decouple core business logic (Payment, Ledger), Auth and Read Heavy Modules.
- Redis to be used for Rate limiting / User Session at application level.
```
