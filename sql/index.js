import Connection from "./connections"
import { CreateActivityTable } from "./Tables/activity"
import { CreateExpenseTable } from "./Tables/expense"
import { CreateExpensesTable } from "./Tables/expenses"
import { CreateTableFriends } from "./Tables/friends"
import { CreateGroupMembersTable } from "./Tables/group-members"
import { CreateGroupTables } from "./Tables/groups"
import { CreatePaymentsTable } from "./Tables/payment"
import { SessionTable } from "./Tables/sessions"
import { ModifyTable, UsersTable } from "./Tables/users"

export const onInitDB = async () => {
    try {
        const db = await Connection.getConnection()
        await db.execAsync(UsersTable)
        await db.execAsync(SessionTable)
        await db.execAsync(CreateGroupTables)
        await db.execAsync(CreateGroupMembersTable)
        await db.execAsync(CreateActivityTable)
        await db.execAsync(CreateExpenseTable)
        await db.execAsync(CreateExpensesTable)
        await db.execAsync(CreateTableFriends)
        await db.execAsync(CreatePaymentsTable)
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
    console.log(res)
}