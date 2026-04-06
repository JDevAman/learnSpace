# SQL

## PSQL

| MySQL                 | PostGreSQL      |
| --------------------- | --------------- |
| SHOW DATABASES        | \l              |
| USE <db_name>         | \c <db_name>    |
| SHOW TABLES           | \dt             |
| DESCRIBE <table_name> | \d <table_name> |
| exit' or quit;        | \q              |

- In PostgreSQL, if table name is capital: you need enclose in double quotes.

## SQL

### Structure

- SQL follows a Declarative pattern. You tell the system what you want, but you must follow the grammar so the engine can build the execution plan.
- The logical processing order usually looks like this:
  - FROM/JOIN: The database gathers all the raw data first.
  - WHERE: It filters out the rows you don't need.
  - GROUP BY/HAVING: It aggregates the data.
  - SELECT: It finally picks the specific columns to show you.
  - ORDER BY: It sorts the final list.

If you put WHERE before FROM, the database tries to filter data it hasn't even gathered yet, leading to a syntax error
SQL forms a strcture.

1. Check Data:
   SELECT \* FROM <table_name>;  
2. Delete Data:
   DELETE FROM <table_name>; or TRUNCATE <table_name>;

JOINS:
