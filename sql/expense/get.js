import Connection from "../connections/index"
import { GET_EXPENSE_OF_A_GROUP } from "./queries";

export const getExpensesOfGroup = async (groupId) => {
    try {
        const db = await Connection.getConnection(GET_EXPENSE_OF_A_GROUP, [groupId]);
        const result = await db.getAllAsync()
        console.log("Expenses", result)
        return result
    } catch (error) {
        console.log("Error getting the expense of group", error)
    }
}
// GET_EXPENSE_OF_A_GROUP, [groupId]