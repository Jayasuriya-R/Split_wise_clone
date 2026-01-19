import Connection from "../connections"
import { GET_GROUPS_OF_USERS } from "./queries"
export const GET_GROUPS_OF_USER = async (userId) => {
    try {
         const db = await Connection.getConnection()
    const result = await db.getAllAsync(GET_GROUPS_OF_USERS, [Number(userId)])
    console.log("group of users",result)
    } catch (error) {
        console.log("Error in getGroupsof user ",error)
    }
   
} 
//, [+userId]