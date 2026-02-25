import Connection from "../connections";
import { GET_ACTIVITIES_BY_USER } from "./queries";

export const getActivitiesOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_ACTIVITIES_BY_USER, [userId]);
    return result;
  } catch (error) {
    console.log("Error fetching activities", error);
  }
};