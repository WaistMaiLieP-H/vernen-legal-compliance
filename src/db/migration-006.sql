-- Migration 006: FISCARA — Financial Strategy & Fiscal Accountability Citizen
-- Transaction ledger for tracking all platform revenue, expenses, and transfers.
-- Created: March 15, 2026

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('REVENUE','EXPENSE','REFUND','TRANSFER')),
  category TEXT NOT NULL,
  amount INTEGER NOT NULL, -- cents
  description TEXT,
  stripe_payment_id TEXT,
  product_id TEXT,
  state TEXT,
  metadata TEXT, -- JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_txn_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_txn_category ON transactions(category);
CREATE INDEX IF NOT EXISTS idx_txn_created ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_txn_stripe ON transactions(stripe_payment_id);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'FISCARA';
