import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { getFriendsOfUser } from '../../sql/friends'
import { useAuth } from '../../Context/AuthProvider'

const AllFriends = () => {
  const { user } = useAuth()
  const [friends, setFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && user?.id) {
      getFriendsOfUser(user.id).then(setFriends).catch(console.log)
    }
  }, [user?.id, isFocused])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      navigation.navigate('FriendPage', { friend: item })
    }}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.sub}>{item.email || item.phone || `#${item.id}`}</Text>
    </TouchableOpacity>
  )

  const filteredFriends = searchQuery
    ? friends.filter(f =>
        f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ margin: 10 }}
      />
      {filteredFriends.length === 0 ? (
        <Text style={styles.empty}>You have no friends yet</Text>
      ) : (
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddFriend')}
        style={styles.addButton}
      >
        Add Friend
      </Button>
    </View>
  )
}

export default AllFriends

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: '500' },
  sub: { fontSize: 12, color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
  addButton: { marginTop: 16, alignSelf: 'center' }
})