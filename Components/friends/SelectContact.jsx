import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import MultiSelect from 'react-native-multiple-select'

const SelectContact = () => {
    const [contacts, setContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    useEffect(()=>{
      getContacts()
    },[])


    const onItemChange = (data)=>{
      setSelectedContacts(data)
    }
    const getContactPermission = async ()=>{
      const permission = await Contacts.getPermissionsAsync();
      if(permission.granted){
        return true;
      }

      const firstPermission = await Contacts.requestPermissionsAsync()
      if(firstPermission.granted){
        return true;
      }
      if(!firstPermission.canAskAgain){
        return false
      }
      const secondPermission = await Contacts.requestPermissionsAsync()
      if(secondPermission.granted){
        return true
      }
    }

    const getContacts = async ()=>{
        const hasPermission = await getContactPermission()
        if(!hasPermission) return;
        const contacts = await Contacts.getContactsAsync({fields:[Contacts.Fields.Name,Contacts.Fields.PhoneNumbers]})
        // console.log(contacts.data)
        setContacts(contacts.data)
    }
    
    
  return (
    <View>
      <Text>SelectContact</Text>
      <MultiSelect uniqueKey='id' items={contacts}
      onSelectedItemsChange={onItemChange}
      selectedItems={selectedContacts}
      />
    </View>
  )
}

export default SelectContact

const styles = StyleSheet.create({})