import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { config } from './config.js';

const dbDir = path.dirname(config.dbFilePath);
fs.mkdirSync(dbDir, { recursive: true });

export const db = new Database(config.dbFilePath);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

const createOrderTableSql = `
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  pair_type TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  contact_preference TEXT NOT NULL,
  notes TEXT,
  urgency TEXT NOT NULL DEFAULT 'standard',
  budget INTEGER,
  catalog_snapshot TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  raw_payload TEXT
);
`;

db.exec(createOrderTableSql);
