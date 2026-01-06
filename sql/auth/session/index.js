import Connection from "../../connections"
import { DeleteSession, GetSession, InsertSessionData } from "./queries";

export const Create_session = async (userId) => {
    try {
        const db = await Connection.getConnection();
        const result = await db.runAsync(InsertSessionData, userId)
        return result
    } catch (error) {
        console.log(error)
    }

} 

export const Delete_Session = async () => {
    try {
        const db = await Connection.getConnection();
        const result = await db.runAsync(DeleteSession)
        return result
    } catch (error) {
        console.log(error)
    }

} 


export const Get_Session = async () => {
    try {
        const db = await Connection.getConnection();
        const result = await db.getAllAsync(GetSession)
        console.log("session",result)
        return result
    } catch (error) {
        console.log(error)
    }

} 