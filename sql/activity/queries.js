export const CREATE_NEW_ACTIVITY  = `INSERT INTO activity (activity,user_id)
VALUES(?,?)`

export const GET_ACTIVITIES_BY_USER = `
SELECT * FROM activity
WHERE user_id = ?
ORDER BY id DESC
`;