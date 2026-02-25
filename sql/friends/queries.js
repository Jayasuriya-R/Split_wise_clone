export const ADD_FRIEND = `
INSERT OR IGNORE INTO friends (adder_id, added_id) VALUES (?,?)
`;

export const GET_FRIENDS_OF_USER = `
SELECT u.*
FROM friends f
INNER JOIN users u ON u.id = f.added_id
WHERE f.adder_id = ?
`;

export const REMOVE_FRIEND = `
DELETE FROM friends WHERE adder_id = ? AND added_id = ?
`;
