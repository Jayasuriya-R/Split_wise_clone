import { registerUsersUnOfficial } from "../auth/user/create";
import Connection from "../connections"
import { createGroupMembers } from "../group-member/create"
import { CREATE_NEW_GROUP_QUERY } from "./queries"

export const createNewGroup = async (name, creatorId) => {
    let db;

    try {
        db = await Connection.getConnection();

        await db.execAsync("BEGIN");

        const group = await db.runAsync(
            CREATE_NEW_GROUP_QUERY,
            [name, creatorId]
        );

        const groupId = group.lastInsertRowId;

        await createGroupMembers([Number(creatorId)], Number(groupId));

        await db.execAsync("COMMIT");

        return groupId;
    } catch (error) {
        if (db) {
            await db.execAsync("ROLLBACK");
        }
        throw error;
    }
};

export const createNewGroupMmebersTransaction = async (
  contacts,
  groupId
) => {
  const db = await Connection.getConnection();

  try {
    console.log("Start TXN");

    await db.execAsync("BEGIN");

    // Register contacts as users
    const userIds = [];

    for (const contact of contacts) {
      const name = contact.name;
      const email =
        contact.email ?? `${contact.id}@local.app`; // fallback

      // Insert user safely
      const result = await db.runAsync(
        `INSERT OR IGNORE INTO users (name, email)
         VALUES (?, ?)`,
        [name, email]
      );

      // Fetch user id (existing or new)
      const user = await db.getFirstAsync(
        `SELECT id FROM users WHERE email = ?`,
        [email]
      );

      if (user?.id) {
        userIds.push(user.id);
      }
    }

    // Add group members
    if (userIds.length) {
      for (const uid of userIds) {
        await db.runAsync(
          `INSERT OR IGNORE INTO group_members
           (group_id, user_id)
           VALUES (?, ?)`,
          [groupId, uid]
        );
      }
    }

    console.log("Commit TXN");
    await db.execAsync("COMMIT");
  } catch (error) {
    console.log("TXN ERROR → rollback", error);

    await db.execAsync("ROLLBACK");

    throw error;
  }
};