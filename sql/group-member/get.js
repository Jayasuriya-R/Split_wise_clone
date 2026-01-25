import Connection from "../connections"
import { GET_ALL_GROUP_MEMBERS_BY_ID, GET_GROUPS_OF_USER_QUERY } from "./queries"

export const GET_GROUPS_OF_USER = async (userId) => {
    try {
        const db = await Connection.getConnection()
        const result = await db.getAllAsync(GET_GROUPS_OF_USER_QUERY, [Number(userId)])

        console.log(" group_members rows:", result);

        return result
    } catch (error) {
        console.log("Error in getGroupsof user ", error)
    }

}

export const GET_MEMBERS_OF_GROUP = async (groupId) => {
    try {
        const db = await Connection.getConnection()
        const result = await db.getAllAsync(GET_ALL_GROUP_MEMBERS_BY_ID, [Number(groupId)])
        console.log(" group_members rows:", result);
        return result
    } catch (error) {
        console.log("Error in getGroupsof user ", error)
    }

}
//, [+userId] , [Number(userId)]