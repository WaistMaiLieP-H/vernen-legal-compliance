-- migration-024-document-vision.sql
-- Document Vision Engine — tracks scanned document processing,
-- OCR extraction results, structured data, and confidence scores.

CREATE TABLE IF NOT EXISTS document_vision (
  id TEXT PRIMARY KEY,
  source_filename TEXT,
  mime_type TEXT NOT NULL,
  image_size_bytes INTEGER NOT NULL DEFAULT 0,
  page_number INTEGER DEFAULT 1,
  batch_id TEXT,                      -- groups multi-page scans
  extracted_text TEXT,
  extraction_confidence REAL DEFAULT 0,
  extraction_model TEXT,              -- which AI model performed extraction
  extraction_duration_ms INTEGER DEFAULT 0,

  -- Structured fields parsed from extracted text
  document_type TEXT,
  document_date TEXT,
  case_number TEXT,
  jurisdiction TEXT,
  issuing_authority TEXT,
  parties TEXT DEFAULT '[]',          -- JSON array of party names
  category TEXT,
  structured_data TEXT DEFAULT '{}',  -- full JSON of all parsed fields

  -- Classification result (ARCHIVIST-0 mapping)
  archivist_doc_type TEXT,
  archivist_confidence REAL DEFAULT 0,

  -- Feed pipeline integration
  feed_document_id TEXT,              -- FK to document_feed.id
  feed_status TEXT DEFAULT 'pending', -- pending, fed, failed

  -- KV storage
  kv_key TEXT,                        -- VISION:{id} key where full result is stored

  status TEXT NOT NULL DEFAULT 'pending', -- pending, extracting, extracted, structured, classified, complete, failed
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_vision_batch ON document_vision(batch_id);
CREATE INDEX IF NOT EXISTS idx_vision_status ON document_vision(status);
CREATE INDEX IF NOT EXISTS idx_vision_type ON document_vision(document_type);
CREATE INDEX IF NOT EXISTS idx_vision_archivist ON document_vision(archivist_doc_type);
CREATE INDEX IF NOT EXISTS idx_vision_created ON document_vision(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vision_feed ON document_vision(feed_document_id);
CREATE INDEX IF NOT EXISTS idx_vision_confidence ON document_vision(extraction_confidence);
