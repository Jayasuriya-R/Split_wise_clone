import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { useAuth } from '../../Context/AuthProvider'
import { removeFriend } from '../../sql/friends'

const FriendPage = () => {
  const { params: { friend } } = useRoute()
  const navigation = useNavigation()
  const { user } = useAuth()

  const handleRemove = async () => {
    try {
      await removeFriend(user.id, friend.id)
      alert('Friend removed')
      navigation.goBack()
    } catch (err) {
      console.log(err)
      alert('Failed to remove friend')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{friend.name}</Text>
      <Text style={styles.sub}>{friend.email || friend.phone || `#${friend.id}`}</Text>
      <Button mode="contained" onPress={handleRemove} style={styles.button}>
        Remove Friend
      </Button>
    </View>
  )
}

export default FriendPage

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  sub: { fontSize: 14, color: '#666', marginBottom: 20 },
  button: { marginTop: 10 },
})