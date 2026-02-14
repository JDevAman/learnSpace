# HTTP - First Principles Deep Dive

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
