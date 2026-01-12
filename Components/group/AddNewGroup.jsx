import { StyleSheet, View } from 'react-native'
import { Appbar, Chip, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuth } from '../../Context/AuthProvider'
import { createNewGroup } from '../../sql/group/create'

const AddGroups = () => {
  const navigation = useNavigation()
  const [groupName, setGroupName] = useState("")
  const [groups, setGroups] = useState([])
 const { user } = useAuth();

const addNewGroup = async () => {
  if (!groupName || groupName.trim() === "") {
    alert("Please enter a group name");
    return;
  }
 console.log("user:",user)
  if (!user?.id) {
    alert("User not logged in");
    return;
  }

  try {
    const groupId = await createNewGroup(groupName, Number(user.id));
    alert(`Group created successfully! \nGroup ID: ${groupId}`);
  } catch (error) {
    console.error("Error occurred while creating group:", error);
    alert("Failed to create group. Please try again.");
  }
};

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Appbar */}
        <Appbar.Header statusBarHeight={0} elevated>
          <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Add Group" />
          <Appbar.Action icon="check" onPress={addNewGroup} />
        </Appbar.Header>

        {/* Content */}
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            value={groupName}
            placeholder="Group name"
            left={<TextInput.Icon icon="image-plus" />}
            style={styles.input}
            onChangeText={setGroupName}
          />
        </View>
        <View>
          {groups.map((x, i) => {
            return (
              <Chip key={i} icon="information">
                {x}
              </Chip>
            )
          })}

        </View>

      </View>
    </SafeAreaProvider>
  )
}

export default AddGroups

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 6,

  },
  input: {
    marginTop: 12,
  },
})