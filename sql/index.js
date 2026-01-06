import Connection from "./connections"
import { SessionTable } from "./Tables/sessions"
import { ModifyTable, UsersTable } from "./Tables/users"

export const onInitDB = async () => {
    try {
        const db = await Connection.getConnection()
        await db.execAsync(UsersTable)
        await db.execAsync(SessionTable)
        getAllTable()
    } catch (error) {
        console.log("Error occured", error)
    }
}

export const onErrorConnectingDB = () => {

}

const getAllTable = async () => {
    const db = await Connection.getConnection()
    const query = `SELECT name FROM sqlite_master WHERE type = 'table';`;
    const res = await db.getAllAsync(query);
  
}