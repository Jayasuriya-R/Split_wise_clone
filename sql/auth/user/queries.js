export const InsertUser = `INSERT INTO users 
(name,email,phone,password,isRegistered) VALUES (?,?,?,?,?)`;

export const GET_USER = `SELECT * FROM users WHERE id = ?`

export const GET_USER_Phone = `SELECT * FROM users WHERE phone = ?`