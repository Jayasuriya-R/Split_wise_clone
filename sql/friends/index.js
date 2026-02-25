import Connection from "../connections";
import { ADD_FRIEND, GET_FRIENDS_OF_USER, REMOVE_FRIEND } from "./queries";

export const addFriend = async (currentUserId, friendUserId, dbInstance) => {
  try {
    const db = dbInstance || (await Connection.getConnection());
    // add both directions to make relationship mutual
    await db.runAsync(ADD_FRIEND, [currentUserId, friendUserId]);
    await db.runAsync(ADD_FRIEND, [friendUserId, currentUserId]);
  } catch (error) {
    console.log("Error adding friend", error);
    throw error;
  }
};

export const removeFriend = async (currentUserId, friendUserId) => {
  try {
    const db = await Connection.getConnection();
    await db.runAsync(REMOVE_FRIEND, [currentUserId, friendUserId]);
    await db.runAsync(REMOVE_FRIEND, [friendUserId, currentUserId]);
  } catch (error) {
    console.log("Error removing friend", error);
    throw error;
  }
};

export const getFriendsOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_FRIENDS_OF_USER, [userId]);
    return result;
  } catch (error) {
    console.log("Error fetching friends", error);
  }
};