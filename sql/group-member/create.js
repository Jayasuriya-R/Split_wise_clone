import Connection from "../connections"
import { CREATE_GROUP_MEMBER_QUERY } from "./queries"

export const createGroupMembers = async (
  arrayOfUsers,
  groupId,
  db
) => {
  if (!arrayOfUsers?.length) {
    throw new Error("No user id present");
  }

  for (const userId of arrayOfUsers) {
    await db.runAsync(
      CREATE_GROUP_MEMBER_QUERY,
      [groupId, userId]
    );
  }
};