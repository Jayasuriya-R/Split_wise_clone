import Connection from "../connections"
import { createGroupMembers } from "../group-member/create"
import { CREATE_NEW_GROUP_QUERY } from "./queries"

export const createNewGroup = async (name, creatorId) => {
    let db;

    try {
        db = await Connection.getConnection();

        await db.execAsync("BEGIN");

        const group = await db.runAsync(
            CREATE_NEW_GROUP_QUERY,
            [name, creatorId]
        );

        const groupId = group.lastInsertRowId;

        await createGroupMembers([Number(creatorId)], Number(groupId));

        await db.execAsync("COMMIT");

        return groupId;
    } catch (error) {
        if (db) {
            await db.execAsync("ROLLBACK");
        }
        throw error;
    }
};
