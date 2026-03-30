-- Migration 018: Add COOPERATIVE entity type to clients table
-- The BusinessEntityType enum includes COOPERATIVE but the D1 CHECK constraint didn't.
-- SQLite doesn't support ALTER TABLE ... ALTER COLUMN, so we recreate the table.

-- Step 1: Create new table with updated constraint
CREATE TABLE IF NOT EXISTS clients_new (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('LLC','CORPORATION','S_CORP','SOLE_PROPRIETORSHIP','PARTNERSHIP','NONPROFIT','COOPERATIVE')),
  industry TEXT DEFAULT 'General',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Step 2: Copy existing data
INSERT OR IGNORE INTO clients_new SELECT * FROM clients;

-- Step 3: Drop old table
DROP TABLE IF EXISTS clients;

-- Step 4: Rename new table
ALTER TABLE clients_new RENAME TO clients;

-- Step 5: Recreate indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_entity_type ON clients(entity_type);
