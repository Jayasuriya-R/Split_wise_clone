export const InsertUser = `INSERT INTO users 
(name,email,phone,password) VALUES (?,?,?,?)`;

export const GET_USER = `SELECT * FROM users WHERE id = ?`