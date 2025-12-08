# 🎵 Playlist Sync

**Sync playlists across music platforms (Spotify → YouTube, YouTube → Spotify, Apple Music, etc.)**
Backend: **Node.js + TypeScript + Prisma + Supabase**

> 🚧 This is an early-stage open-source project.
> Follow the roadmap below to contribute or track development.

---

## ⭐ Features (MVP Target)

* 🔐 User auth (JWT)
* 🔗 Connect music providers (starting with Spotify)
* 📚 Fetch playlists across providers
* 🔄 Sync one playlist to another
* 🔎 Auto-match tracks across platforms
* 📊 View sync summary (matched, missing, failed)

---

## 📦 Tech Stack

* **Node.js + TypeScript**
* **Express.js**
* **Prisma ORM**
* **Supabase Postgres**
* **JWT Auth**
* Providers:

  * Spotify (first)
  * YouTube Music (next)
  * Apple Music (optional later)

---

# 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/playlist-sync.git
cd playlist-sync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env`:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key

# Provider (Spotify)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://localhost:3000/providers/spotify/callback
```

### 4. Setup database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start development server

```bash
npm run dev
```

---

# 🗂️ Project Structure

```
src/
 ├── api/
 │   ├── v1/
 │   ├── middlewares/
 ├── services/
 ├── integrations/
 │   ├── core/
 │   ├── spotify/
 ├── persistence/
 │   ├── repositories/
 │   └── prisma/
 ├── domain/
 ├── config/
 ├── utils/
 ├── app.ts
 └── server.ts
```

---

# 🧭 Development Roadmap (MVP)

Below is the structured, phase-wise plan for building the backend MVP.

---

# 📌 Phase 0 – Base Setup

**Goal:** Ensure foundational setup works.

### Tasks

* [x] Configure `tsconfig.json`
* [x] Setup Prisma with Supabase Postgres
* [x] Run initial migration
* [x] Launch Prisma Studio
* [x] Confirm `npm run dev` works
* [x] Add required environment variables:

  * [x] `DATABASE_URL`
  * [x] `JWT_SECRET`
  * [ ] Provider secrets placeholders

---

# 📌 Phase 1 – Core Data Model (Prisma)

**Goal:** Create backend schema for all required entities.

### Models

* [x] User
* [x] ProviderAccount
* [x] Playlist
* [x] SyncMapping
* [x] SyncRunLog (optional)

### Tasks

* [x] Write `schema.prisma`
* [x] `npx prisma migrate dev --name init_mvp`
* [x] `npx prisma generate`

---

# 📌 Phase 2 – Auth System (JWT)

**Goal:** Database-backed authentication.

### Backend Tasks

* [ ] PrismaUserRepository

  * [ ] create()
  * [ ] findByEmail()
  * [ ] findById()
* [ ] Update AuthService
* [ ] JWT login/register
* [ ] `requireAuth` middleware

### Routes

* [ ] POST `/auth/register`
* [ ] POST `/auth/login`
* [ ] GET `/auth/me`

### Tests

* [ ] Duplicate email → 409
* [ ] Wrong password → 401
* [ ] Protected route → 401

---

# 📌 Phase 3 – Provider OAuth (Spotify First)

**Goal:** Connect Spotify account & save tokens.

### ProviderAccount Logic

* [ ] ProviderAccountRepository
* [ ] ProviderAccountService
* [ ] Save OAuth tokens: accessToken, refreshToken, expiresAt

### OAuth Endpoints

* [ ] GET `/providers/spotify/auth-url`
* [ ] GET `/providers/spotify/callback`

### Spotify Client

* [ ] `getAuthorizationUrl()`
* [ ] `exchangeCodeForToken()`

---

# 📌 Phase 4 – Playlist Import & Display

**Goal:** Fetch playlists for connected providers.

### Core Interface

* [ ] Define `MusicProviderClient`:

  * [ ] `getUserPlaylists()`
  * [ ] `getPlaylistTracks()`
  * [ ] `createPlaylist()`
  * [ ] `addTracksToPlaylist()`
  * [ ] `searchTrack()`

### Implementations

* [ ] SpotifyClient
* [ ] ProviderFactory

### Endpoint

* [ ] GET `/playlists/:provider`

---

# 📌 Phase 5 – Sync Logic (The Brain)

**Goal:** Core feature – sync one playlist to another.

### SyncMapping CRUD

* [ ] POST `/sync-mappings`
* [ ] GET `/sync-mappings`
* [ ] DELETE `/sync-mappings/:id`

### Sync Engine

* [ ] `SyncService.runSync(mappingId, userId)`

  * Fetch mapping
  * Fetch tokens
  * Load source tracks
  * Match tracks on target
  * Add missing tracks
  * Store lastRunAt + lastStatus

### Endpoint

* [ ] POST `/sync-mappings/:id/run`

  * Returns: `{ total, matched, failed }`

---

# 📌 Phase 6 – Minimal Frontend (Optional)

Basic UI for interacting with backend:

* [ ] Auth pages
* [ ] Connect Spotify button
* [ ] Playlist picker
* [ ] Create sync mapping
* [ ] Run sync
* [ ] View status

---

# 📌 Phase 7 – Polish (Optional Enhancements)

* [ ] Auto-refresh provider tokens
* [ ] Better error-handling & logs
* [ ] Rate-limiting
* [ ] Store detailed sync logs
* [ ] Unit tests
* [ ] Background job queue (BullMQ)

---

# ✔️ Current Status (Live Tracking)

| Phase           | Status        |
| --------------- | ------------- |
| Base Setup      | ⬜ Not started |
| Prisma Models   | ⬜ Not started |
| Auth System     | ⬜ Not started |
| Provider OAuth  | ⬜ Not started |
| Playlist Import | ⬜ Not started |
| Sync Engine     | ⬜ Not started |
| Frontend MVP    | ⬜ Optional    |
| Enhancements    | ⬜ Optional    |

---

# 🤝 Contributing

Contributions welcome!
To contribute:

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a PR

Please follow the roadmap for phase alignment.

---

# 📄 License

MIT License.
