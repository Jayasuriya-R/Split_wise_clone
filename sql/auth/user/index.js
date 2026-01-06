import Connection from "../../connections"
import { GET_USER, InsertUser } from "./queries";

export const CreateUser = async (name, email, phone, password) => {
    try {
        const db = await Connection.getConnection();
        const createdUser = await db.runAsync(InsertUser, [name, email, phone, password])
        console.log(createdUser)
        return await GetUser(createdUser?.lastInsertRowId)
    } catch (error) {
        console.log(error)
    }
}

export const GetUser = async (id)=>{
    try{
        const db = await Connection.getConnection();
        const result = db.getFirstAsync(GET_USER,id)
        console.log(result)
        return result
    }catch(error){
        console.log(error)
    }
}