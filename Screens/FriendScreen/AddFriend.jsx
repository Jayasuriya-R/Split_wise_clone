import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SelectContact from '../../Components/friends/SelectContact'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../../Context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { GetUserByIdentifier, CreateUser } from '../../sql/auth/user'
import { addFriend } from '../../sql/friends'

const AddFriend = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [identifier, setIdentifier] = useState('') // email/phone
  const [name, setName] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])

  const handleAdd = async () => {
    if (!identifier && selectedContacts.length === 0) {
      alert('Enter email/phone or select a contact');
      return;
    }

    try {
      let friendUsers = [];

      // if contacts selected, convert each to a user
      if (selectedContacts.length) {
        for (const contact of selectedContacts) {
          const phone = contact.phone || '';
          const email = contact.email || '';
          const lookup = phone || email || contact.name;
          let existing = await GetUserByIdentifier(lookup);
          let fuser;
          if (existing) {
            fuser = existing;
          } else {
            // create a guest user using available info
            fuser = await CreateUser(contact.name, email, phone, 'guest_pass', 0);
          }
          if (fuser?.id) friendUsers.push(fuser);
        }
      } else {
        // manual identifier path
        let existing = await GetUserByIdentifier(identifier);
        let fuser;
        if (existing) {
          fuser = existing;
        } else {
          if (!name) {
            alert('Please provide a name for the new contact');
            return;
          }
          fuser = await CreateUser(name, '', identifier, 'guest_pass', 0);
        }
        friendUsers.push(fuser);
      }

      // add each friend relationship
      for (const fu of friendUsers) {
        await addFriend(user.id, fu.id);
      }

      alert('Friend(s) added');
      navigation.goBack();
    } catch (err) {
      console.log('Failed to add friend', err);
      alert('Error adding friend');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Friend</Text>

      <SelectContact onSelectedContacts={setSelectedContacts} />

      <Text style={styles.or}>OR</Text>

      <TextInput
        label="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Name (required if new)"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />

      <Button mode="contained" onPress={handleAdd} style={styles.button}>
        Add Friend
      </Button>
    </View>
  )
}

export default AddFriend

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  or: {
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    marginVertical: 6,
  },
  button: {
    marginTop: 16,
  },
})