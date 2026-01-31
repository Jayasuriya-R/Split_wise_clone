import { Dimensions, StyleSheet, Text, View } from 'react-native'
import SelectContact from '../../Components/friends/SelectContact'
import React, { useState } from 'react'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppState } from '../../Context/AppStateProvider'
import { createNewGroupMmebersTransaction } from '../../sql/group/create'

const AddGroupMembers = () => {
  const [selectedContacts, setSelectedContacts] = useState([])
  const nav = useNavigation()
  const {selectedGroup} = useAppState() 
  console.log("selectedGroup",selectedGroup)

  const addNewMembers = async ()=>{
    if(selectedContacts.length === 0){
      return
    }
    try {
      console.log("selectedContacts",selectedContacts)
      await createNewGroupMmebersTransaction(selectedContacts,selectedGroup.id);
      alert("Sucess")
    } catch (error) {
      console.log("error",error)
    }
  }
  return (
    <View>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title={selectedGroup?.group_name}/>
         <Appbar.Action
        icon="check"
        onPress={addNewMembers}
      />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.text}>Add New Member</Text>
        <SelectContact onSelectedContacts={setSelectedContacts} />
      </View>
    </View>
  )
}

export default AddGroupMembers

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  container: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 'auto',
    padding: 20,
    height: 250

  }
})