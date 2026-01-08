import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AddNewGroup = () => {
    const nav = useNavigation()
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {nav.navigate("AllGroups")}} />
        <Appbar.Action icon="magnify" onPress={() => { alert('search')}} /> 
      </Appbar.Header>
    </View>
  )
}

export default AddNewGroup

const styles = StyleSheet.create({})