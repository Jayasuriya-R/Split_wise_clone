import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const GroupAppBar = ({ onSearch }) => {

  const nav = useNavigation()

  const handleNavigateToAddgroup = ()=>{
    nav.navigate("AddGroup")
  }
  return (
    <View>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Group" />
        <Appbar.Action icon="magnify" onPress={onSearch} />
        <Appbar.Action icon="account-multiple-plus-outline" onPress={handleNavigateToAddgroup} />
      </Appbar.Header>
    </View>
  )
}

export default GroupAppBar

const styles = StyleSheet.create({
  appBar: {
    elevation: 4,              
    marginTop: 0,              
    marginLeft: 0,           
  }
});
