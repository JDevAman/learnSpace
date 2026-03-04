# Zerodha

## 1. Handling 7+ millions tables

Core Problem:
The "Financial Reporting" NightMare:
Zerodha deals with hundreds of billions of rows of financial data. During tax season or financial end arrival, millions of user request reports simultaneously.

- Synchronus Failure:
  A user clicks "Download", the app queries massive DB, and connection stays open for 30+ seconds while DB scans billions of rows. This leads to snowball effect where the database and appserver both crash under the load.

- Diversity Issue:
  They use multiple databases (PostGreSQL, ClickHouse, MariaDB) across different apps written in different languages.

Possible Architectural Solutions:

- Create Read Replicas of different tables like complex queries of old DBs goes to one table.

The Solution: "Dung Beetle" (Middleware)
Instead of hardcoding queuing logic into every app, they built a lightweight "Go" middleware (only ~ 1700 lines of code).

1. Asynchronous Job Management

- Task Definition: Every report is saved as named SQL Query in file (e.g. get_profit_entries).
- Request Flow: The app sends HTTP request to Dung Beetle with report name and parameters like Date Range. Dung Beetle immediately returns a "JobId" and queues the task.
- Traffic Control: Dung Beetle controls how many heavy queries are sent to master/analytical databases at once, preventing them from being overwhelmed.

2. The "Result DB" Hack (The 7 Million Tables)
   This is most unconventional part of their architecture:\

- Dedicated Tables per Request: For every single report request, Dung Beetle creates a brand-new, unique table in a separate "Results PostgreSQL" instance.
- Postgres as Cache: Once complex query finishes, the resulting rows (usually a few hundred or thousand) are dumped into this fresh table.
- Instant UI Interaction: The user's app then performs a `SELECT *` on this small, dedicated table. Because the table only contains that user's specific data, filtering and sorting are instantneous.

Scale & Maintenance Stats
The "Results DB" is a single PostgreSQL node on EC2 (64 vCPUs, 128GB RAM)

- 7 Million+ Tables: On an average day, the DB holds over 7 million individual tables.
- Metadata Heaviness: The PG_ATTRIBUTE table (which tracks columns) grows to about 48GB just to store the metadata of these 7 million tables.
- The "Daily Reset" Hack: Dropping 7 million tables individually would take forever. Instead, every night they shut down Postgres, detach the disk, attach a fresh empty disk, and restart. This "nuclear" reset takes only a few seconds.

Why this works

- Decoupling: The application layer doesn't need to know about the complex underlying data structures; it just reads from a simple "cached" table.
- Language Agnostic: Since it's a simple HTTP API, any of their microservices (Go, Python, etc.) can trigger reports.
- Postgres Resilience: Kailash notes that even with 60GB of metadata, Postgres boots up in about 3 seconds, proving its reliability for "software abuse".
