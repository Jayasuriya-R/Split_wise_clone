import Connection from "../../connections"
import { GET_USER, InsertUser } from "./queries";

export const CreateUser = async (name, email, phone, password, isRegistered = 1) => {
    try {
        const db = await Connection.getConnection();
        const createdUser = await db.runAsync(InsertUser, [name, email, phone, password, isRegistered])
        return await GetUser(createdUser?.lastInsertRowId)
    } catch (error) {
        console.log(error)
    }
}

export const GetUser = async (id) => {
    try {
        const db = await Connection.getConnection();
        const result = await db.getFirstAsync(GET_USER, id)
        return result
    } catch (error) {
        console.log(error)
    }
}