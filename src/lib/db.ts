import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";

const DATA_DIR = path.join(process.cwd(), "data");

let _db: Database.Database | null = null;
let _disabled = false;

function tryOpen(): Database.Database | null {
  if (_db) return _db;
  if (_disabled) return null;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const database = new Database(path.join(DATA_DIR, "enquiries.db"));
    database.pragma("journal_mode = WAL");
    database.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at   TEXT NOT NULL DEFAULT (datetime('now')),
        name         TEXT NOT NULL,
        phone        TEXT NOT NULL,
        email        TEXT NOT NULL,
        service      TEXT,
        message      TEXT,
        user_agent   TEXT,
        ip           TEXT,
        email_sent   INTEGER NOT NULL DEFAULT 0,
        email_error  TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);
    `);
    _db = database;
    return database;
  } catch (err) {
    // Serverless environments (Vercel, Netlify) have read-only or ephemeral filesystems.
    // Disable persistence gracefully — email remains the primary channel.
    console.warn("[db] SQLite unavailable, running without audit log:", err instanceof Error ? err.message : err);
    _disabled = true;
    return null;
  }
}

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service?: string | null;
  message?: string | null;
  user_agent?: string | null;
  ip?: string | null;
};

export function insertEnquiry(e: Enquiry): number | null {
  const db = tryOpen();
  if (!db) return null;
  try {
    const info = db
      .prepare(
        `INSERT INTO enquiries (name, phone, email, service, message, user_agent, ip)
         VALUES (@name, @phone, @email, @service, @message, @user_agent, @ip)`
      )
      .run({
        name: e.name,
        phone: e.phone,
        email: e.email,
        service: e.service ?? null,
        message: e.message ?? null,
        user_agent: e.user_agent ?? null,
        ip: e.ip ?? null,
      });
    return Number(info.lastInsertRowid);
  } catch (err) {
    console.warn("[db] insert failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export function markEmail(id: number | null, ok: boolean, error?: string) {
  if (id == null) return;
  const db = tryOpen();
  if (!db) return;
  try {
    db.prepare(`UPDATE enquiries SET email_sent = ?, email_error = ? WHERE id = ?`)
      .run(ok ? 1 : 0, error ?? null, id);
  } catch {
    // ignore — email delivery is what matters
  }
}

export type EnquiryRow = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  service: string | null;
  message: string | null;
  email_sent: number;
  email_error: string | null;
};

export function listEnquiries(limit = 100): EnquiryRow[] {
  const db = tryOpen();
  if (!db) return [];
  try {
    return db
      .prepare(
        `SELECT id, created_at, name, phone, email, service, message, email_sent, email_error
         FROM enquiries ORDER BY id DESC LIMIT ?`
      )
      .all(limit) as EnquiryRow[];
  } catch {
    return [];
  }
}
