export const InsertUser = `INSERT INTO users 
(name,email,phone,password,isRegistered) VALUES (?,?,?,?,?)`;

// fetch by primary key (id) only
export const GET_USER = `SELECT * FROM users WHERE id = ?`;

// convenience lookup by phone number
export const GET_USER_Phone = `SELECT * FROM users WHERE phone = ?`;

// lookup by id, email or phone (used during login)
export const GET_USER_BY_IDENTIFIER = `
SELECT * FROM users
WHERE id = ?
   OR email = ?
   OR phone = ?
`;
