import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GroupAppBar from '../../Components/group/GroupAppBar'
import GroupLayout from '../../Components/group/GroupLayout'
import GroupContent from '../../Components/group'

const AllGroups = () => {
  return (
    <View style={{ flex: 1 }}>
      <GroupContent/>
    </View>
  )
}

export default AllGroups

const styles = StyleSheet.create({})