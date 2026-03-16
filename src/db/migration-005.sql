-- Migration 005: LEXARC — Corporate Strategy & Legal Architecture
-- Creates the generated_documents table for LEX-1 document storage.

CREATE TABLE IF NOT EXISTS generated_documents (
  id TEXT PRIMARY KEY,
  document_type TEXT NOT NULL,
  client_id TEXT,
  business_name TEXT,
  state TEXT,
  entity_type TEXT,
  params TEXT, -- JSON
  content TEXT NOT NULL, -- HTML
  is_paid INTEGER NOT NULL DEFAULT 0,
  stripe_payment_id TEXT,
  generated_by TEXT NOT NULL DEFAULT 'LEX-1',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_docs_type ON generated_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_docs_client ON generated_documents(client_id);

UPDATE persona_citizens SET status = 'SHELL_DEPLOYED' WHERE name = 'LEXARC';
