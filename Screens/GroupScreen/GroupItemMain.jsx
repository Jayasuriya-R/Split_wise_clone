import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const GroupItemMain = () => {
  const nav = useNavigation()
  return (
    <View style={styles.container}>
      <FAB onPress={()=> nav.navigate("GroupAddExpense")} style={styles.fab} label='Add Expense' icon={"wallet-plus-outline"}/>
    </View>
  )
}

export default GroupItemMain

const styles = StyleSheet.create({

  container:{
    flex:1
  },
  fab:{
    position:'absolute',
    bottom:15,
    right:5
  }
})