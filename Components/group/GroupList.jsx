import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GET_GROUPS_OF_USER } from '../../sql/group-member/get'
import { useAuth } from '../../Context/AuthProvider'
import GroupListItem from './GroupListItem'

const GroupList = () => {
  const { user } = useAuth()
  const [groupOfUsers, setGroupOfUsers] = useState([]) 

  useEffect(() => {
    const fetchGroups = async () => {
      console.log("Logged user:", user)
      const groupUsers = await GET_GROUPS_OF_USER(user.id)
      setGroupOfUsers(groupUsers || [])
    }

    if (user?.id) {
      fetchGroups()
    }
  }, [user?.id])

  return (
    <View style={{ flex: 1 }}>
      <Text>GroupList</Text>

      <FlatList style={styles.list}
        data={groupOfUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GroupListItem groups={item} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No groups found
          </Text>
        }
      />
    </View>
  )
}

export default GroupList

const styles = StyleSheet.create({
  list:{
    padding:10
  }
})
