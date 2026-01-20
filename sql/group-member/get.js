import Connection from "../connections"
import { GET_GROUPS_OF_USER_QUERY } from "./queries"
export const GET_GROUPS_OF_USER = async (userId) => {
    try {
         const db = await Connection.getConnection()
    const result = await db.getAllAsync(GET_GROUPS_OF_USER_QUERY,[Number(userId)])
    
console.log(" group_members rows:", result);

    return result
    } catch (error) {
        console.log("Error in getGroupsof user ",error)
    }
   
} 
//, [+userId] , [Number(userId)]