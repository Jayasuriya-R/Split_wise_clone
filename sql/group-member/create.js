import Connection from "../connections"
import { CREATE_GROUP_MEMBER_QUERY } from "./queries"

export const createGroupMembers = async (arrayOfUsers, groupId) => {
    
    if(arrayOfUsers.length === 0){throw new Error("No user id present")}
    try {
        const db = await Connection.getConnection()
        for (const id of arrayOfUsers) {
            const result = await db.runAsync(CREATE_GROUP_MEMBER_QUERY, [groupId, id])
        }
    } catch (error) {
         console.log("Error occured while creating new group member",error)
    }

}