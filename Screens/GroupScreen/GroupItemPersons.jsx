import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useAppState } from '../../Context/AppStateProvider'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { GET_MEMBERS_OF_GROUP } from '../../sql/group-member/get'
import { Button } from 'react-native-paper'

const GroupItemPersons = () => {
  const [members, setMembers] = useState([])
  const nav = useNavigation()
  const {selectedGroup} = useAppState()
  
  const handleAddNewMembers = ()=>{
    nav.navigate("AddGroupMembers")
  }

const isFocused = useIsFocused()

useLayoutEffect(()=>{
   if (isFocused && selectedGroup?.id) {
       GET_MEMBERS_OF_GROUP(selectedGroup.id).then(setMembers).catch((err)=>console.log(err))
     }
  },[selectedGroup?.id, isFocused])

  return (
    <View style={styles.root}>
      <Button style={styles.addButton} onPress={handleAddNewMembers} mode='contained-tonal'>Add New Member</Button>
      {members.map((m) => (
        <Text key={m.user_id} style={styles.member}>{m.name}</Text>
      ))}
    </View>
  )
} 

export default GroupItemPersons

const styles = StyleSheet.create({
  root: { padding: 16 },
  addButton: { alignSelf: 'center', marginVertical: 10, width: 200 },
  member: { paddingVertical: 8, fontSize: 16, borderBottomWidth: 1, borderColor: '#eee' }
})