import { PaymentStatus } from "../../utils/helper";
import { addNewActivity } from "../activity/add";
import Connection from "../connections";
import { addNewPaymentRecord } from "../payment/add";
import {
  CREATE_NEW_EXPENSE_QUERY,
  CREATE_NEW_EXPENSE_SPLITS_QUERY,
} from "./queries";

/**
 * MAIN EXPENSE CREATION
 */
export const addNewExpense = async (
  expenseData,
  amount,
  description,
  loggedInUserId,
  groupId
) => {
  let db;

  try {
    // -----------------------------
    // Validation
    // -----------------------------
    if (!groupId) throw new Error("Invalid groupId");
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    const totalPercentage = Object.values(expenseData).reduce(
      (sum, val) => sum + Number(val),
      0
    );

    if (Math.round(totalPercentage) !== 100) {
      throw new Error("Split percentage must equal 100%");
    }

    // -----------------------------
    // DB Transaction Start
    // -----------------------------
    db = await Connection.getConnection();

    await db.execAsync("BEGIN");
    console.log("✅ Transaction started");

    // -----------------------------
    // Create expense record
    // -----------------------------
    const expenseId = await addExpenseRecord(
      db,
      description,
      amount,
      loggedInUserId,
      groupId
    );

    console.log("✅ Expense created:", expenseId);

    // -----------------------------
    // Activity — main user
    // -----------------------------
    const activityTextMainUser = `Added expense ₹${amount} in group ${groupId}`;

    await addNewActivity(
      db,
      activityTextMainUser,
      loggedInUserId
    );

    // -----------------------------
    // Split handling
    // -----------------------------
    const userIds = Object.keys(expenseData).filter(
      (uid) => +uid !== loggedInUserId
    );

    for (const userId of userIds) {
      const percentage = expenseData[userId];

      // safe currency math
      const shareAmount =
        Math.round(amount * (percentage / 100) * 100) / 100;

      // split record
      await addExpenseSplitRecord(
        db,
        expenseId,
        +userId,
        shareAmount
      );

      // activity
      const activityText =
        `Expense #${expenseId}: you owe ₹${shareAmount}`;

      await addNewActivity(db, activityText, +userId);

      // payment record
      await addNewPaymentRecord(
        db,
        +userId,
        +loggedInUserId,
        shareAmount,
        expenseId,
        PaymentStatus.PENDING
      );

      console.log(
        `✅ Split + payment created for user ${userId}`
      );
    }

    // -----------------------------
    // Commit transaction
    // -----------------------------
    await db.execAsync("COMMIT");

    console.log("🎉 Transaction committed");

    return expenseId;
  } catch (error) {
    console.error("❌ Transaction failed:", error);

    if (db) {
      try {
        await db.execAsync("ROLLBACK");
        console.log("↩ Transaction rolled back");
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
    }

    throw error;
  }
};

/**
 * INSERT EXPENSE RECORD
 */
export const addExpenseRecord = async (
  db,
  description,
  amount,
  paidBy,
  groupId
) => {
  try {
    const result = await db.runAsync(
      CREATE_NEW_EXPENSE_QUERY,
      [description, amount, paidBy, groupId, 0]
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error("Expense insert failed:", error);
    throw error;
  }
};

/**
 * INSERT SPLIT RECORD
 */
export const addExpenseSplitRecord = async (
  db,
  expenseId,
  userId,
  amountOwed
) => {
  try {
    const result = await db.runAsync(
      CREATE_NEW_EXPENSE_SPLITS_QUERY,
      [expenseId, userId, amountOwed]
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error("Split insert failed:", error);
    throw error;
  }
};
