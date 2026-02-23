import Connection from "../connections/index"
import { GET_EXPENSE_OF_A_GROUP, GET_EXPENSE_SPLITS_OF_A_EXPENSE } from "./queries";

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

export const getExpensesSplits = async (expenseId) => {
    try {
        const db = await Connection.getConnection();
        const result = await db.getAllAsync(GET_EXPENSE_SPLITS_OF_A_EXPENSE, [expenseId,expenseId])
        console.log("Expenses splits", result)
        return result
    } catch (error) {
        console.log("Error getting the expense of splits", error)
    }
}
// GET_EXPENSE_OF_A_GROUP, [groupId]