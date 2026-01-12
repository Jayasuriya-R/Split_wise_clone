import Connection from "../connections"
import { CREATE_NEW_GROUP_QUERY } from "./queries"

export const createNewGroup = async (name, creatorId) => {
    try {
        const db = await Connection.getConnection()
        await db.execAsync('BEGIN')
        const group = await db.runAsync(CREATE_NEW_GROUP_QUERY, [name, creatorId])
        const groupId = group.lastInsertRowId;
        await CreateGroupMembersTable([creatorId], groupId, db)

        await db.execAsync("COMMIT")
    } catch (error) {
        await db.execAsync("ROLLBACK");
    }
}