export const CREATE_GROUP_MEMBER_QUERY = `INSERT INTO group_members(
group_id,user_id) VALUES (?,?)
`;

export const GET_ALL_GROUP_MEMBERS_BY_ID = `SELECT * FROM group_members gm
INNER JOIN users u ON gm.user_id = u.id
WHERE group_id = ?`

export const GET_GROUPS_OF_USER_QUERY  = `
SELECT g.*,
       COUNT(gm2.user_id) AS member_count
FROM group_members gm
INNER JOIN groups g ON gm.group_id = g.id
LEFT JOIN group_members gm2 ON gm2.group_id = g.id
WHERE gm.user_id = ?
GROUP BY g.id
`
// export const GET_GROUPS_OF_USER_QUERY = `
//  SELECT * FROM group_members;

