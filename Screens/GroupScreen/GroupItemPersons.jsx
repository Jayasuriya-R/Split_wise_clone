import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import SelectContact from '../../Components/friends/SelectContact'
import { useAppState } from '../../Context/AppStateProvider'
import { useLinkBuilder } from '@react-navigation/native'
import { GET_MEMBERS_OF_GROUP } from '../../sql/group-member/get'

const GroupItemPersons = () => {
  const {selectedGroup} = useAppState()
  console.log("selectedGroup",selectedGroup)
useLayoutEffect(()=>{
   GET_MEMBERS_OF_GROUP(selectedGroup)
},[])
  return (
    <View>
      <Text>GroupItemPersons</Text>
      <SelectContact/>
    </View>
  )
}

export default GroupItemPersons

const styles = StyleSheet.create({})