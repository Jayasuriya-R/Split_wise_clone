import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { GET_GROUPS_OF_USER } from '../../sql/group-member/get'
import { useAuth } from '../../Context/AuthProvider';
import Connection from '../../sql/connections';

const GroupList = () => {
  const { user } = useAuth();  
  useEffect( ()=>{
 GET_GROUPS_OF_USER(2)
  },[])
  return (
    <View>
      <Text>GroupList</Text>
    </View>
  )
}

export default GroupList

const styles = StyleSheet.create({})