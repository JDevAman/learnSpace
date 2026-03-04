# 12 DATABASES

## INTRODUCTION

1. Why? Need for Persistence.
2. What is database? Persistence System that can create, read, update and delete.
3. Types:
   - Disk Based: Hard Disk / SSD - PostGre (Uses a buffer cache in RAM, but the SSD is the "Source of Truth").
   - Memory Based: RAM - Redis (Extremely fast, but volatile—data is lost on power failure unless snapshotted).
4. DBMS (Database Management System):
   - Organization
   - Access - CRUD
   - Integrity (Ensuring data stays valid via constraints).
   - Security

   Why DBMS?
   - Store data simple in Text file.
   - Cons: Parsing Overhead, Unstructured data, concurrency (Handling multiple users writing simultaneously without corruption).

   Types of DBMS:
   - Relational (RDBMS):
   - Stored in form of tables, rows and columns.
   - PreDefined Schema.
   - Data Integrity (ACID Compliance).
   - SQL (Structured Query Language).
   - Example: CMS (Content Management Systems).

   - Non Relational (NoSQL):
   - Stored in form of collections and document.
   - Example: CRM, Real-time feeds.

5. Postgres:
   - OpenSource.
   - SQL based.
   - JSON Support (JSONB).
   - First Choice for most backend engineers.

---

## Postgres

### Queries

```sql
CREATE TABLE <table_name> {
id SERIAL PRIMARY_KEY,
some_smallint SMALLINT,
some_integer INTEGER,
some_bigint BIGINT,
some_decimal DECIMAL (10, 2),
some_real REAL,
some_double DOUBLE PRECISION,
some_char CHAR,
some_varchar VARCHAR(255),
some_text TEXT,
some_boolean BOOLEAN,
some_date DATE,
some_time TIME,
some_timestamp TIMESTAMP,
some_timestampz TIMESTAMZ,
some_interval INTERVAL,
some_uuid UUID,
some_json JSON,
some_jsonb JSONB,
some_array INTEGER[],
some_inet INET,
some_macaddr MACADDR,
some_point POINT,
some_xml XML
}

```

```sql
INSERT INTO TABLE data_types_demo (
some_smallint, some_integer, some_bigint, some_decimal, some_numeric, some_real, some_double, some_char, some_varchar, some_text, some_boolean, some_date, some_time, some_timestamp, some_timestampz, some_interval, some_uuid, some_json, some_jsonb, some_array, some_inet, some_macaddr, some_point, some_xml
)
VALUES
(
32767, -- SMALLINT
214748364, -- INTEGER
9223372836854775887, -- BIGINT
1234.56, -- DECIMAL
98876.56, -- NUMERIC
123.456, -- REAL
123.4567890123456, -- DOUBLE PRECISION
'CHAR10PAD', -- CHAR(10)
'Variable length', -- VARCHAR(255)
'Long text can go here', -- TEXT
TRUE, -- BOOLEAN
'2024-03-14', -- DATE
'15:30:00', -- TIME
'2024-03-14 15:30:00', -- TIMESTAMP
'2024-03-14 15:30:00+00', -- TIMESTAMPZ
'2 years 3 months 4 days', -- INTERVAL
'a0eebc99-9c0b-4ef8-bb6d-6bb9hkhkh3a11', -- UUID
'{"name": "John", "age": "30"}', -- JSON
'{"name": "John", "age": "30"}', -- JSONB
ARRAY[1,2,3,4,5], -- INTEGER[]
'192.168.1.1', -- INET
'08:00:2b:01:02:03', -- MACADDR
'(10.5, 20.5)', -- POINT
'<root><element>some xml</element></root>' -- XML
);

```

### Data types

- INTEGER: Standard 4-byte integer.
- SMALLINT: 2-byte, smaller range.
- BIGINT: 8-byte. Mentor Tip: Use BIGINT for Primary Keys to avoid ID exhaustion in large systems.
- DECIMAL / NUMERIC: Store in xx.yy format, better to use when accuracy matters (e.g., Financial transactions).
- REAL / DOUBLE: Floating point. Warning: Do not use for money due to rounding errors.
- CHAR: Adds empty spaces if length not reached, only use if same length (e.g., Country Codes).
- VARCHAR: Variable length. 255 is an old convention; not strictly required in Postgres.
- TEXT: Unlimited length. In Postgres, TEXT and VARCHAR have the same performance.
- TIMESTAMPZ: Store timestamp with timezone. Mentor Tip: Always use this for global apps.
- JSONB: JSON Binary. Compressed and indexed. Much faster than standard JSON for reads.
- ENUM: Specific types used instead of free text to ensure data consistency.

---

### MIGRATIONS

- Structure: Folder `db > migrations > files` with extension `.sql`.
- CLI Tools: `dbmate`, `go-migrate`.
- Case: Changes were made to current db schema.
- Up migrations: Tracks latest changes (CREATE/ALTER).
- Down migrations: Used for revert (DROP/ROLLBACK).

Why need?

1. Tracking DB Schema changes across team members.
2. Version Control for your database.
3. Reliable Roll Backs.

---

### CONSTRAINTS

- REFERENCES (Referential Integrity): Ensures a row in one table points to a valid row in another.
- ON DELETE Actions:
- RESTRICT: Stop the parent from being deleted if children exist.
- CASCADE: Delete the parent, and all related children are automatically deleted.
- SET NULL: If parent is deleted, set child reference to NULL.
- SET DEFAULT: Set child reference to a default value.

---

### DB DESIGN

PROJECT MANAGEMENT SYSTEM

migration.sql

UP MIGRATION:

- ENUMS: `project_status`, `task_status`, `member_role`.
- TABLES:
- `users`
- `user_profiles` (1:1 with users - uses `user_id` as both FK and UNIQUE).
- `projects`
- `tasks` (1:Many with projects - task table has `project_id`).
- `project_members` (Many:Many linking table with `project_id` and `user_id`).

DOWN MIGRATION:

- DROP: `DROP TABLE IF EXISTS <tables>`, `DROP TYPE IF EXISTS <types>`.

Relationship Differences:

- 1:1: We typically use the same ID or a unique foreign key.
- 1:Many: The "Many" side holds a Foreign Key to the "One" side's Primary Key.
- Many:Many: Requires a junction table. The Primary Key is usually a composite: `{project_id, user_id}`.

Testing data:

- Seeding: Filling data for testing/development.
- CTE (Common Table Expression): A temporary result set defined using `WITH` that you can reference within a SELECT, INSERT, UPDATE, or DELETE.

---

### SQL

Order of Execution:

1. FROM / JOIN
2. WHERE
3. GROUP BY / HAVING
4. SELECT
5. ORDER BY / LIMIT

Ex 1: Get users

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
ORDER BY u.created_at DESC;

```

Parameterized Query: Prevents SQL Injection. The input is treated as a string, not executable code. Expressed as `:parameter_name`.

Ex 2: Get user by id

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
WHERE u.id = :userId
ORDER BY u.created_at DESC;

```

Ex 3: Get User by query params

```sql
SELECT u.*, to_jsonb(up.*) as profile
FROM users u LEFT JOIN user_profiles up
ON u.id = up.user_id
WHERE u.full_name ILIKE :letter || '%'
ORDER BY :sortBy :sortOrder
OFFSET :page
LIMIT :limit;

```

Ex 4: Create user

```sql
INSERT INTO users (email, full_name, password_hash)
VALUES (:email, :full_name, :password_hash)
RETURNING *; -- Returns the newly created row (including generated ID)

```

Ex 5: Update User

```sql
UPDATE user_profiles
SET bio = :bio, phone = :phone
WHERE user_id = :user_id
RETURNING *;

```

---

### TRIGGERS

Update fields such as `updated_at` automatically.

Function:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_At = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'pgsql';

```

Trigger:

```sql
CREATE TRIGGER update_users_updated_at
   BEFORE UPDATE ON users
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();

```

---

### INDEXING

Database default: Sequential scan (reads every single row) $O(n)$.
Index: Uses a B-Tree / B+ Tree to store sorted pointers to rows $O(\log n)$.

Trade-offs:

- Write Penalty: Slower INSERT/UPDATE/DELETE (Index must be updated).
- Disk Space: Indexes take up storage.

Criteria for indexing:

- Columns used in `WHERE` clauses.
- Columns used in `JOIN` conditions.
- Columns used for `ORDER BY`.

Maintains:

- Lookup table.
- Order (Default: ASC or DESC).

Create Indexes:

```sql
CREATE INDEX idx_users_email on users(email);
CREATE INDEX idx_users_created_at on users(created_at);

```

---

### NOTE

- POSTGRES is case sensitive for unquoted identifiers in some contexts but treats them as lowercase. Recommendation: Stick to `snake_case` and lowercase for everything.
- Primary Key is automatically indexed by the database using a B-Tree.
