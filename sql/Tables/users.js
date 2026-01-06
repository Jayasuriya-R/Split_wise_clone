export const UsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  isRegistered INTEGER DEFAULT 0,
  password TEXT NOT NULL
);
`;

export const ModifyTable = `ALTER TABLE users ADD COLUMN password TEXT NOT NULL`