# DSA Dump — One-Shot Revision Sheet (Java)

> **Purpose:** High-density recall before OA / Interview / Weekly Revision.
> **Legend:** 🔴 Trap / Common Mistake · 🟡 Key Insight · 🟢 Template Ready

---

## 0. Complexity — Quick Reference

### Growth Hierarchy

$$O(1) < O(\log N) < O(\sqrt{N}) < O(N) < O(N \log N) < O(N^2) < O(2^N) < O(N!)$$

### Practical Limits (10^8 ops/sec rule)

| Complexity    | Max N (1 sec) |
| ------------- | ------------- |
| $O(\log N)$   | Any           |
| $O(\sqrt{N})$ | $10^{14}$     |
| $O(N)$        | $10^8$        |
| $O(N \log N)$ | $10^6$        |
| $O(N^2)$      | $10^4$        |
| $O(N^3)$      | $500$         |
| $O(2^N)$      | $20–25$       |
| $O(N!)$       | $10–12$       |

### Master Theorem — `T(n) = aT(n/b) + O(n^d)`

1. $d < \log_b a \implies O(n^{\log_b a})$
2. $d = \log_b a \implies O(n^d \log n)$
3. $d > \log_b a \implies O(n^d)$

---

## 1. Mathematics

### 1.1 Modular Arithmetic

- $(a + b) \% m = ((a \% m) + (b \% m)) \% m$
- $(a \times b) \% m = ((a \% m) \times (b \% m)) \% m$
- 🔴 Division is **NOT** directly modular — use modular inverse.
- 🔴 Java `%` can return **negative** for negative operands. Fix: `((a % m) + m) % m`

### 1.2 Fermat's Little Theorem

- Rule: If $P$ is prime, $a^{P-1} \equiv 1 \pmod{P}$
- **Modular Inverse:** $\text{inv}(a) = a^{P-2} \pmod{P}$
- Constraint: $a \not\equiv 0 \pmod{P}$

```java
long modPow(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}
// Modular inverse: modPow(a, P-2, P)
```

### 1.3 Stirling's Approximation

$$n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n$$

- 🟡 Java `long` holds up to $\approx 9.2 \times 10^{18}$. $20! \approx 2.4 \times 10^{18}$ fits; $21!$ overflows.
- Use `BigInteger` if $n!$ beyond 20 is needed.
- Digits of $n!$: $\lfloor \sum_{k=1}^{n} \log_{10}(k) \rfloor + 1$

### 1.4 Useful Series & Sums

| Formula                         | Value                      |
| ------------------------------- | -------------------------- |
| $\sum_{i=1}^{N} i$              | $\frac{N(N+1)}{2}$         |
| $\sum_{i=1}^{N} i^2$            | $\frac{N(N+1)(2N+1)}{6}$   |
| $\sum_{i=1}^{N} \frac{1}{i}$    | $\approx \ln N$ (Harmonic) |
| Geometric: $\sum_{i=0}^{N} r^i$ | $\frac{r^{N+1}-1}{r-1}$    |

### 1.5 GCD / LCM

```java
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
long lcm(long a, long b) { return a / gcd((int)a, (int)b) * b; } // divide first to avoid overflow
```

### 1.6 Sieve of Eratosthenes — $O(N \log \log N)$

```java
boolean[] sieve(int n) {
    boolean[] isComposite = new boolean[n + 1];
    isComposite[0] = isComposite[1] = true;
    for (int i = 2; (long) i * i <= n; i++)
        if (!isComposite[i])
            for (int j = i * i; j <= n; j += i)
                isComposite[j] = true;
    return isComposite; // isComposite[i] == false → i is prime
}
```

- 🟡 Why $O(N \log \log N)$? Harmonic sum of prime reciprocals $\approx \log \log N$.

---

## 2. Bit Manipulation

| Operation                | Java Code                              |
| ------------------------ | -------------------------------------- |
| Check $k$-th bit         | `(n >> k) & 1`                         |
| Set $k$-th bit           | `n \| (1 << k)`                        |
| Clear $k$-th bit         | `n & ~(1 << k)`                        |
| Toggle $k$-th bit        | `n ^ (1 << k)`                         |
| Power of 2 check         | `n > 0 && (n & (n-1)) == 0`            |
| Rightmost set bit        | `n & -n`                               |
| Clear rightmost set bit  | `n & (n-1)`                            |
| Count set bits           | `Integer.bitCount(n)`                  |
| Highest one bit position | `31 - Integer.numberOfLeadingZeros(n)` |

🔴 `>>` is arithmetic (sign-extends); `>>>` is logical (unsigned). Use `>>>` when treating bits as unsigned.
🔴 `1 << 31` overflows `int` — use `1L << 31` for masks beyond bit 30.

### Subset Enumeration over Mask `m`

```java
for (int s = m; s > 0; s = (s - 1) & m) {
    // process subset s of m
}
// Does NOT process empty subset (s=0) — handle separately if needed
```

- Time: $O(3^N)$ over all masks.

---

## 3. Arrays & Strings

### 3.1 Two Pointers

- **Use when:** Sorted array, pair/triplet sum, palindrome check.
- Pattern: `l=0, r=n-1`, converge inward — $O(N)$.

### 3.2 Sliding Window

```java
int l = 0, ans = 0;
for (int r = 0; r < n; r++) {
    // add arr[r] to window
    while (/* window invalid */) {
        // remove arr[l] from window
        l++;
    }
    ans = Math.max(ans, r - l + 1);
}
```

### 3.3 Prefix Sum

```java
int[] pre = new int[n + 1];
for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + arr[i];
// Range sum [l, r] (0-indexed): pre[r+1] - pre[l]
```

### 3.4 Kadane's Algorithm — Max Subarray $O(N)$

```java
int maxSubarray(int[] a) {
    int cur = a[0], best = a[0];
    for (int i = 1; i < a.length; i++) {
        cur = Math.max(a[i], cur + a[i]);
        best = Math.max(best, cur);
    }
    return best;
}
```

### 3.5 Sorting in Java

```java
Arrays.sort(arr);                          // primitives: dual-pivot quicksort, NOT stable
Arrays.sort(arr, l, r);                    // sort range [l, r)
Arrays.sort(objArr, Comparator.comparingInt(x -> x.val)); // objects: TimSort, stable

// 🔴 Comparator lambda overflow trap:
Collections.sort(list, (a, b) -> a - b);           // WRONG if values can be large/negative
Collections.sort(list, (a, b) -> Integer.compare(a, b)); // CORRECT

// Reverse sort for int[] (no direct method):
Integer[] boxed = Arrays.stream(arr).boxed().toArray(Integer[]::new);
Arrays.sort(boxed, Collections.reverseOrder());
```

---

## 4. Binary Search

### Templates

```java
// Lower bound: first index where arr[i] >= target
int lo = 0, hi = n; // open right boundary
while (lo < hi) {
    int mid = lo + (hi - lo) / 2; // avoids overflow
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
}
// lo is the answer

// Upper bound: first index where arr[i] > target
// change condition: arr[mid] <= target → lo = mid + 1
```

🟡 **Binary search on answer:** feasibility check $O(N)$ → total $O(N \log(\text{range}))$.

### Built-in

```java
// Returns index if found; else -(insertion point) - 1
int idx = Arrays.binarySearch(sortedArr, target);
int idx = Collections.binarySearch(sortedList, target);
```

---

## 5. Linked List

| Operation        | Trick                                           |
| ---------------- | ----------------------------------------------- |
| Detect cycle     | Floyd's slow/fast pointers                      |
| Find cycle start | Reset one ptr to head; advance both by 1        |
| Middle node      | Fast reaches end → slow is at mid               |
| Reverse          | `prev=null, cur=head`; flip `.next` iteratively |
| Merge two sorted | Dummy head pattern                              |

🔴 Always null-check before accessing `.next`.

---

## 6. Stack & Queue

### Java Collections

```java
Deque<Integer> stack = new ArrayDeque<>();  // preferred over Stack<>
stack.push(x); stack.pop(); stack.peek();

Queue<Integer> queue = new ArrayDeque<>();
queue.offer(x); queue.poll(); queue.peek();

Deque<Integer> deque = new ArrayDeque<>();
deque.offerFirst(x); deque.offerLast(x);
deque.pollFirst();   deque.pollLast();
deque.peekFirst();   deque.peekLast();
```

🔴 Never use `Stack<>` — it's legacy and synchronized. Always use `ArrayDeque`.

### Monotonic Stack — $O(N)$

```java
// Next Greater Element
Deque<Integer> st = new ArrayDeque<>();
int[] nge = new int[n];
Arrays.fill(nge, -1);
for (int i = 0; i < n; i++) {
    while (!st.isEmpty() && arr[st.peek()] < arr[i])
        nge[st.pop()] = arr[i];
    st.push(i);
}
```

### Monotonic Deque — Sliding Window Max $O(N)$

```java
Deque<Integer> dq = new ArrayDeque<>(); // stores indices
int[] result = new int[n - k + 1];
for (int i = 0; i < n; i++) {
    while (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
    while (!dq.isEmpty() && arr[dq.peekLast()] <= arr[i]) dq.pollLast();
    dq.offerLast(i);
    if (i >= k - 1) result[i - k + 1] = arr[dq.peekFirst()];
}
```

---

## 7. Trees

### 7.1 Iterative Inorder

```java
Deque<TreeNode> stack = new ArrayDeque<>();
TreeNode cur = root;
while (cur != null || !stack.isEmpty()) {
    while (cur != null) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    // visit cur
    cur = cur.right;
}
```

### 7.2 Key Tree Facts

| Property                      | Detail                          |
| ----------------------------- | ------------------------------- |
| Height of balanced BST        | $O(\log N)$                     |
| Nodes at level $k$            | Up to $2^k$                     |
| Binary Tree edges             | $N - 1$                         |
| Euler Tour (DFS-in + DFS-out) | Flattens tree for range queries |

### 7.3 LCA

- **Naive:** Walk up from both nodes — $O(N)$.
- **Binary Lifting:** $O(N \log N)$ build, $O(\log N)$ query.
- 🟡 Euler Tour + Sparse Table = $O(1)$ query.

### 7.4 Segment Tree

```java
int[] tree = new int[4 * n];

void build(int[] arr, int node, int s, int e) {
    if (s == e) { tree[node] = arr[s]; return; }
    int mid = (s + e) / 2;
    build(arr, 2*node, s, mid);
    build(arr, 2*node+1, mid+1, e);
    tree[node] = tree[2*node] + tree[2*node+1];
}
void update(int node, int s, int e, int idx, int val) {
    if (s == e) { tree[node] = val; return; }
    int mid = (s + e) / 2;
    if (idx <= mid) update(2*node, s, mid, idx, val);
    else            update(2*node+1, mid+1, e, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}
int query(int node, int s, int e, int l, int r) {
    if (r < s || e < l) return 0; // identity element for sum
    if (l <= s && e <= r) return tree[node];
    int mid = (s + e) / 2;
    return query(2*node, s, mid, l, r) + query(2*node+1, mid+1, e, l, r);
}
```

### 7.5 Fenwick Tree / BIT

```java
int[] bit = new int[n + 1];
void update(int i, int delta) {
    for (; i <= n; i += i & -i) bit[i] += delta;
}
int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & -i) sum += bit[i];
    return sum;
}
int rangeQuery(int l, int r) { return query(r) - query(l - 1); }
```

🟡 Simpler than Segment Tree; prefer when only prefix sums are needed.

---

## 8. Graph Algorithms

### 8.1 Representation

```java
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
adj.get(u).add(v);

// Weighted: List<List<int[]>> where int[] = {neighbor, weight}
```

### 8.2 Complexity

| Algorithm      | Time             | Space    |
| -------------- | ---------------- | -------- |
| BFS / DFS      | $O(V+E)$         | $O(V)$   |
| Dijkstra       | $O((V+E)\log V)$ | $O(V)$   |
| Bellman-Ford   | $O(VE)$          | $O(V)$   |
| Floyd-Warshall | $O(V^3)$         | $O(V^2)$ |
| Kruskal MST    | $O(E \log E)$    | $O(V)$   |

🔴 Dijkstra **fails** with negative edges.

### 8.3 Dijkstra

```java
int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0;
PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
pq.offer(new int[]{0, src});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int d = cur[0], u = cur[1];
    if (d > dist[u]) continue; // stale entry — skip
    for (int[] e : adj.get(u)) {
        int v = e[0], w = e[1];
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.offer(new int[]{dist[v], v});
        }
    }
}
```

### 8.4 Union-Find (DSU)

```java
int[] par, rank;
void init(int n) {
    par = new int[n]; rank = new int[n];
    for (int i = 0; i < n; i++) par[i] = i;
}
int find(int x) { return par[x] == x ? x : (par[x] = find(par[x])); }
boolean unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return false;
    if (rank[x] < rank[y]) { int t = x; x = y; y = t; }
    par[y] = x;
    if (rank[x] == rank[y]) rank[x]++;
    return true;
}
```

🟡 Amortized $O(\alpha(N)) \approx O(1)$ per op.

### 8.5 Topological Sort — Kahn's BFS

```java
int[] indegree = new int[n];
for (int u = 0; u < n; u++)
    for (int v : adj.get(u)) indegree[v]++;
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indegree[i] == 0) q.offer(i);
List<Integer> topo = new ArrayList<>();
while (!q.isEmpty()) {
    int u = q.poll(); topo.add(u);
    for (int v : adj.get(u)) if (--indegree[v] == 0) q.offer(v);
}
// topo.size() != n → cycle exists
```

### 8.6 Cycle Detection

| Graph      | Method                                           |
| ---------- | ------------------------------------------------ |
| Undirected | DSU or DFS (track parent)                        |
| Directed   | DFS with states: 0=unvisited, 1=in-stack, 2=done |

---

## 9. Dynamic Programming

### 9.1 DP Patterns

| Pattern            | Key Idea                     | Example                        |
| ------------------ | ---------------------------- | ------------------------------ |
| 0/1 Knapsack       | Include or exclude item      | Subset sum                     |
| Unbounded Knapsack | Item reusable                | Coin change                    |
| LCS                | `dp[i][j]` on two strings    | Edit Distance                  |
| LIS                | Patience sort or DP          | Longest Increasing Subsequence |
| Interval DP        | `dp[l][r]` merge subproblems | Matrix chain, Burst Balloons   |
| DP on Tree         | Post-order, child → parent   | Max Independent Set on tree    |
| Bitmask DP         | `dp[mask]`                   | TSP, min XOR cover             |

### 9.2 LIS — $O(N \log N)$

```java
int lis(int[] arr) {
    List<Integer> tails = new ArrayList<>();
    for (int x : arr) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1); // insertion point
        if (pos == tails.size()) tails.add(x);
        else tails.set(pos, x);
    }
    return tails.size();
}
```

### 9.3 Knapsack

```java
// 0/1 Knapsack — O(N * W)
int[] dp = new int[W + 1];
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--) // reverse to prevent item reuse
        dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);

// Unbounded Knapsack
for (int w = 0; w <= W; w++)
    for (int i = 0; i < n; i++)
        if (wt[i] <= w)
            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
```

### 9.4 Memoization Template

```java
Map<String, Integer> memo = new HashMap<>();
int solve(int i, int j /*, ... */) {
    String key = i + "," + j;
    if (memo.containsKey(key)) return memo.get(key);
    // base cases here
    int res = /* recurrence */;
    memo.put(key, res);
    return res;
}
```

🟡 For integer states, prefer `int[][] dp` over HashMap — 10–100x faster.

---

## 10. Backtracking

### General Template

```java
void backtrack(List<List<Integer>> result, List<Integer> current /* , state */) {
    if (/* base case */) {
        result.add(new ArrayList<>(current)); // 🔴 must copy!
        return;
    }
    for (/* choices */) {
        if (/* pruning */) continue;
        current.add(choice);
        backtrack(result, current /* , next state */);
        current.remove(current.size() - 1); // undo
    }
}
```

### Complexity Cutoffs

| Problem      | Complexity        | Safe N  |
| ------------ | ----------------- | ------- |
| Subsets      | $O(2^N)$          | ≤ 25    |
| Permutations | $O(N!)$           | ≤ 12    |
| Combinations | $O(\binom{N}{K})$ | ≤ 20–25 |

🟡 $N > 25$ + feels exponential → **Meet in the Middle** $O(2^{N/2})$ or DP.

---

## 11. Heaps & Priority Queue

```java
PriorityQueue<Integer> minH = new PriorityQueue<>();                   // min-heap (default)
PriorityQueue<Integer> maxH = new PriorityQueue<>(Collections.reverseOrder()); // max-heap

// Custom object — always use Integer.compare to avoid overflow
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
```

| Use Case            | Heap Type                                     |
| ------------------- | --------------------------------------------- |
| K largest elements  | Min-heap of size K                            |
| K smallest elements | Max-heap of size K                            |
| Median maintenance  | Max-heap (lower half) + Min-heap (upper half) |
| Dijkstra            | Min-heap on `{dist, node}`                    |

---

## 12. Strings

### 12.1 Key Java String Methods

```java
s.charAt(i)              // O(1)
s.length()               // O(1)
s.substring(l, r)        // O(r-l), new String allocated
s.toCharArray()          // use for in-place mutation
s.equals(t)              // content equality — never use ==
s.indexOf(t)             // O(N*M) naive
s.contains(t)            // O(N*M)
s.split(regex)
String.valueOf(n)        // int/char → String
Integer.parseInt(s)      // String → int
Character.isDigit(c)
Character.isLetter(c)
Character.toLowerCase(c)
```

🔴 String `+` in a loop is $O(N^2)$ — always use `StringBuilder`.

### 12.2 KMP — Pattern Matching $O(N + M)$

```java
int[] buildLPS(String pat) {
    int m = pat.length(); int[] lps = new int[m];
    for (int i = 1, len = 0; i < m; ) {
        if (pat.charAt(i) == pat.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return lps;
}
```

### 12.3 Trie

```java
class TrieNode {
    TrieNode[] ch = new TrieNode[26];
    boolean end;
}
class Trie {
    TrieNode root = new TrieNode();
    void insert(String w) {
        TrieNode n = root;
        for (char c : w.toCharArray()) {
            if (n.ch[c-'a'] == null) n.ch[c-'a'] = new TrieNode();
            n = n.ch[c-'a'];
        }
        n.end = true;
    }
    boolean search(String w) {
        TrieNode n = root;
        for (char c : w.toCharArray()) {
            if (n.ch[c-'a'] == null) return false;
            n = n.ch[c-'a'];
        }
        return n.end;
    }
}
```

### 12.4 Rolling Hash (Rabin-Karp)

$$H = (c_0 \cdot B^{n-1} + \dots + c_{n-1}) \% M$$

- Slide in $O(1)$: remove leftmost, add rightmost char.
- 🔴 Use two independent (base, mod) pairs to minimize collision probability.

---

## 13. Java Collections — Quick Reference

```java
// Sorted (Red-Black Tree) — O(log N) ops
TreeMap<K, V>      // floorKey(x), ceilingKey(x), firstKey(), lastKey()
TreeSet<T>         // floor(x), ceiling(x), first(), last(), headSet(), tailSet()

// Hash — avg O(1)
HashMap<K, V>
HashSet<T>

// Insertion-ordered
LinkedHashMap<K, V>
LinkedHashSet<T>

// Frequency map idioms
map.getOrDefault(key, 0) + 1
map.merge(key, 1, Integer::sum)
map.put(key, map.getOrDefault(key, 0) + 1)

// Useful utility methods
Arrays.fill(arr, val)
Arrays.copyOfRange(arr, l, r)       // [l, r)
Arrays.stream(arr).sum()
Collections.sort(list)
Collections.reverse(list)
Collections.swap(list, i, j)
Collections.nCopies(n, defaultVal)
```

### TreeMap Tricks

```java
TreeMap<Integer, Integer> tm = new TreeMap<>();
tm.floorKey(x)     // largest key <= x  (null if none)
tm.ceilingKey(x)   // smallest key >= x (null if none)
tm.firstKey()      // min
tm.lastKey()       // max
```

---

## 14. Greedy — When to Trust It

✅ Use greedy when:

- **Exchange argument** holds (any swap of adjacent choices only worsens result).
- Problem has **optimal substructure** with locally optimal = globally optimal.

Common greedy problems: Activity Selection, Huffman Coding, Fractional Knapsack, Minimum Platforms, Jump Game.

🔴 Greedy **fails** on 0/1 Knapsack — use DP.

---

## 15. Common OA Patterns — Decision Map

```
Is the array sorted (or can be sorted)?
  ├─ Pair sum → Two Pointers
  ├─ Find element → Binary Search
  └─ Subarray/window → Sliding Window

Does the problem involve subarrays/substrings?
  ├─ Fixed size → Sliding Window
  ├─ Variable size → Sliding Window with shrink
  └─ All subarrays → Prefix Sum or Kadane's

Does the problem involve "next greater/smaller"?
  └─ Monotonic Stack

Does the problem have overlapping subproblems?
  └─ DP (top-down with memo or bottom-up)

Does the problem involve connectivity/paths?
  ├─ Unweighted shortest path → BFS
  ├─ Weighted shortest path → Dijkstra / Bellman-Ford
  └─ Connected components → DSU or DFS

Does the problem involve "best subset/selection"?
  ├─ Choices with weight/value → DP Knapsack
  └─ N ≤ 20 → Bitmask DP
```

---

## 16. Edge Cases Checklist 🔴

- [ ] Empty array / single element / `n = 0`
- [ ] All elements same / all negative
- [ ] Integer overflow → use `long`; multiply before comparing: `(long) a * b`
- [ ] Java `%` negative result: `((a % m) + m) % m`
- [ ] Comparator overflow: `(a, b) -> a - b` is WRONG; use `Integer.compare(a, b)`
- [ ] 0-indexed vs 1-indexed off-by-one
- [ ] Graph: disconnected components, self-loops, parallel edges
- [ ] DP init: use `Integer.MIN_VALUE / 2` (not `MIN_VALUE`) to avoid overflow on `+ 1`
- [ ] Modular arithmetic: mod after every `+` and `*`
- [ ] Binary search: infinite loop when `lo = mid` instead of `lo = mid + 1`
- [ ] ArrayList `remove(int idx)` vs `remove(Integer val)` — cast explicitly
- [ ] Backtracking: `result.add(new ArrayList<>(current))` not `current`

---

## 17. Java-Specific Traps 🔴

| Trap                              | Fix                                                              |
| --------------------------------- | ---------------------------------------------------------------- |
| `==` on `Integer` objects         | Use `.equals()` — auto-unboxing only reliable for -128 to 127    |
| `Stack<>` class                   | Use `Deque<> + ArrayDeque`                                       |
| String `+` in loop                | Use `StringBuilder`                                              |
| `Arrays.sort(int[])` unstable     | Box to `Integer[]` for stable sort                               |
| Comparator `a - b` overflow       | Use `Integer.compare(a, b)`                                      |
| `HashMap` key must not be mutable | Use immutable keys (String, int[])                               |
| Deep recursion (>10K depth)       | Convert to iterative with explicit stack                         |
| `int[]` in PriorityQueue          | Not directly comparable — use `int[][]` with explicit comparator |
| Autoboxing in tight loops         | Creates GC pressure — use primitive arrays where possible        |

---

## 18. Weekly Drill — Derive from Scratch

Every Sunday, pick one to derive without looking:

1. Modular Inverse via Fermat's Little Theorem
2. Sieve complexity ($O(N \log \log N)$ from Harmonic series)
3. Master Theorem — apply to Merge Sort, Binary Search
4. KMP LPS construction
5. DSU amortized complexity argument
6. Why Dijkstra fails on negative edges
7. Why `(a - b)` comparator overflows and `Integer.compare(a, b)` does not

---

_Last Updated: —9 Mar 2026_
