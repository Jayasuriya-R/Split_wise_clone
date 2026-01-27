import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useAppState } from '../../Context/AppStateProvider'
import {  useNavigation } from '@react-navigation/native'
import { GET_MEMBERS_OF_GROUP } from '../../sql/group-member/get'
import { Button } from 'react-native-paper'

const GroupItemPersons = () => {
  const [members, setMembers] = useState([])
  const nav = useNavigation()
  const {selectedGroup} = useAppState()
  
  const handleAddNewMembers = ()=>{
  nav.navigate("AddGroupMembers")
  }
useLayoutEffect(()=>{
   GET_MEMBERS_OF_GROUP(selectedGroup).then(setMembers).catch((err)=>console.log)
},[])
  return (
    <View>
      <Button style={{width:'300', marginVertical:'10',marginHorizontal:'auto' }} onPress={handleAddNewMembers} mode='contained-tonal'>Add New Member</Button>
      <Text>GroupItemPersons</Text>
      
    </View>
  )
}

export default GroupItemPersons

const styles = StyleSheet.create({})