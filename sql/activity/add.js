import { CREATE_NEW_ACTIVITY } from "./queries"

export const addNewActivity =async (db,activity,userId)=>{
    try {
        const activityRecord = await db.runAsync(CREATE_NEW_ACTIVITY,[activity,userId])
        console.log("Activity Created!",JSON.stringify(activityRecord))
        return activityRecord?.lastInsertRowId;
    } catch (error) {
        console.log("Error in activity",error)
    }
}