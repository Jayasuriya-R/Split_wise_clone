import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { GET_GROUPS_OF_USER } from '../../sql/group-member/get'
import { useAuth } from '../../Context/AuthProvider'
import GroupListItem from './GroupListItem'

const GroupList = ({ searchQuery = '', setSearchQuery, showSearch = false }) => {
  const { user } = useAuth()
  const isFocused = useIsFocused()
  const [groupOfUsers, setGroupOfUsers] = useState([]) 

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user?.id) return
      const groupUsers = await GET_GROUPS_OF_USER(user.id)
      setGroupOfUsers(groupUsers || [])
    }

    if (isFocused && user?.id) {
      fetchGroups()
    }
  }, [user?.id, isFocused])

  // apply filtering if searchQuery present
  const filteredGroups = searchQuery
    ? groupOfUsers.filter(g =>
        g.group_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groupOfUsers;

  return (
    <View style={{ flex: 1 }}>
          {showSearch && setSearchQuery && (
        <TextInput
          mode="outlined"
          placeholder="Search groups..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ margin: 10 }}
        />
      )}
      <FlatList style={styles.list}
        data={filteredGroups}
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
