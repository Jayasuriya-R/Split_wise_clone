import Connection from "../connections";
import { CREATE_NEW_EXPENSE_QUERY, CREATE_NEW_EXPENSE_SPLITS_QUERY } from "./queries"

export const addNewExpense = async (expenseData,users,amount,description,loggedInUserId,groupId) => {
   try {
    const db = await Connection.getConnection ();
    db.execAsync("BEGIN")
    console.log("Transaction started")

   const expense = await addExpenseRecord(db,description,amount,loggedInUserId,groupId)
    console.log("Expense Record created",expense)

    
    db.execAsync("COMMIT")
    console.log("Transaction complete")
   } catch (error) {
    db.execAsync("ROLLBACK")
    console.log("Transaction failed")
   }
}

export const addExpenseRecord = async (db, description, amount, paidBy, groupId) => {
    try {
        const newExpense = await db.runAsync(CREATE_NEW_EXPENSE_QUERY, [
            description, amount, paidBy, groupId, 0
        ]);
        console.log("expense recoors", newExpense)
        return newExpense.lastInsertRowId
    } catch (error) {
        console.log("Error occured", error)
    }
}

export const addExpenseSplitRecord = async (db, expenseId, userId, amountOwed) => {
    try {
        const newExpense = await db.runAsync(CREATE_NEW_EXPENSE_SPLITS_QUERY, [
            expenseId, userId, amountOwed
        ]);
        console.log("expense recoors", newExpense)
        return newExpense.lastInsertRowId
    } catch (error) {
        console.log("Error occured", error)
    }
}