import { registerUsersUnOfficial } from "../auth/user/create";
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

export const createNewGroupMmebersTransaction = async (contactIds, groupId) => {
    const db = await Connection.getConnection();
    try { 
        console.log("Start TXN")
        await db.execAsync("BEGIN");
         
        const userIds = await registerUsersUnOfficial(contactIds)
       
        if (userIds.length > 0){
            await createGroupMembers(userIds,groupId , db )
        }
        console.log("Commit TXN")
        await db.execAsync("COMMIT");

       
    } catch (error) {
        if (db) {
            await db.execAsync("ROLLBACK");
        }
        throw error;
    }
};