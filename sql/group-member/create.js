import { CREATE_GROUP_MEMBER_QUERY } from "./queries"

export const createGroupMembers = async (arrayOfUsers, groupId, db) => {
    if(arrayOfUsers.length === 0){throw new Error("Nouser id present")}
    try {
        for (const id of arrayOfUsers) {
            const result = await db.runAsync(CREATE_GROUP_MEMBER_QUERY, [groupId, id])
        }
    } catch (error) {
         console.log("Error occured while creating new group member",error)
    }

}