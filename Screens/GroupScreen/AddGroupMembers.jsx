import { Dimensions, StyleSheet, Text, View } from 'react-native'
import SelectContact from '../../Components/friends/SelectContact'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AddGroupMembers = () => {
  const [selectedContacts, setSelectedContacts] = useState([])
  const nav = useNavigation()
  return (
    <View>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Splits" />
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