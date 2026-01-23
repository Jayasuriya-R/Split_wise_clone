import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const GroupItem = () => {
  const { params: { groups } } = useRoute()
  return (
    <View>
      <Text>{groups.group_name}</Text>
    </View>
  )
}

export default GroupItem

const styles = StyleSheet.create({})