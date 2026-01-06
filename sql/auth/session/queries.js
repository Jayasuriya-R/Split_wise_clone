export const InsertSessionData = `INSERT INTO users_session (id,user_id) VALUES (1,?) `


export const GetSession = `SELECT * FROM users_session`


export const DeleteSession  = `DELETE FROM users_session`