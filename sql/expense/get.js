import Connection from "../connections/index"
import { GET_EXPENSE_OF_A_GROUP } from "./queries";

export const getExpensesOfGroup = async (groupId) => {
    try {
        const db = await Connection.getConnection();
        const result = await db.getAllAsync(GET_EXPENSE_OF_A_GROUP, [groupId])
        console.log("Expenses", result)
        return result
    } catch (error) {
        console.log("Error getting the expense of group", error)
    }
}
// GET_EXPENSE_OF_A_GROUP, [groupId]