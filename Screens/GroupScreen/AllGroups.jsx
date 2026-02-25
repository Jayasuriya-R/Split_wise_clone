import { StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect } from 'react'
import GroupAppBar from '../../Components/group/GroupAppBar'
import GroupLayout from '../../Components/group/GroupLayout'
import GroupContent from '../../Components/group'
import Connection from '../../sql/connections'

const AllGroups = () => {
  // const GetUser = async () => {
  //     try {
  //         const db = await Connection.getConnection();
  //         const result = await db.getAllAsync(`SELECT * FROM users`)
  //         console.log("result",result) 
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  // useEffect(()=>{
  //    GetUser()
  // },[])
  return (
    <View style={{ flex: 1 }}>
      <GroupContent/>
    </View>
  )
}

export default AllGroups

const styles = StyleSheet.create({})