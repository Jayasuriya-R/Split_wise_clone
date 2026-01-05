import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const FallBack = () => {
  return (
    <View style={styles.container}>
      <Text>SPLIT_BILL</Text>
      <ActivityIndicator/>
    </View>
  )
}

export default FallBack

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    }
})