import Connection from "../connections"
import { createGroupMembers } from "../group-member/create"
import { CREATE_NEW_GROUP_QUERY } from "./queries"

export const createNewGroup = async (name, creatorId) => {
    try {
        const db = await Connection.getConnection()
        await db.execAsync('BEGIN')
        const group = await db.runAsync(CREATE_NEW_GROUP_QUERY, [name, creatorId])
        const groupId = group.lastInsertRowId;
        await  createGroupMembers([+creatorId], Number(groupId))

        await db.execAsync("COMMIT")
    } catch (error) {
        await db.execAsync("ROLLBACK");
    }
}