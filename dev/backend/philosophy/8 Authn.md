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
