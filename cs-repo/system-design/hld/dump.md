# HLD

## Engineering for 1 Million Requests Per Second (RPS)

For more details: https://www.youtube.com/watch?v=W4EwfEU8CGA
This is the realm of "Systems Engineering" - managing the movement of electrons across hardware.

### I. The Critical Bottlenecks

1. Hardware Constraints:
    - Compute (CPU): The bottleneck is often the overhead of context switching and interrupt handling.
    - Network (NIC): A standard 10Gbps card will saturate at ~40k RPS if payloads are large. For 1M RPS, you require
      100Gbps+ or Elastic Network Adapters (ENA).
    - Memory (RAM): The only storage medium fast enough for real-time processing. Disk I/O is effectively "dead" at this
      scale.

2. Software & Stack:
    - The Runtime Trap:
        * Node.js/Python: Excellent for I/O-bound tasks, but the Garbage Collector (GC) and
          single-thread event loop become bottlenecks at extreme scales.
        * C++/Rust (Drogon/Axum): Used when you must
          eliminate the overhead of a virtual machine or interpreter to save CPU
          cycles.

    - Bad Engineering Practices:
        - O(n) Operations: COUNT(*) or ORDER BY RANDOM() on 10M+ rows will hang the DB for seconds. At 1M RPS, you only
          use O(1)or O(log n) operations.
        - Inefficient Serialization: JSON parsing is CPU-intensive. High-performance
          systems use Protobuf or FlatBuffers.

### II. Performance Measurements:

Never assume, always measure. Use the Concurrency Formula to understand the
load:$$\text{Total Concurrent Requests} = \text{Connections} \times \text{Pipelining}$$

- Pipelining: Sending multiple requests over a single connection without waiting for individual responses. This
  saturates the "wire" and tests the server's limit.
- Latency vs. Throughput: You must measure the p99 latency (the time it takes for the slowest 1% of requests). A high
  RPS is useless if the latency is 10 seconds.

### III. Architectural Solutions

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