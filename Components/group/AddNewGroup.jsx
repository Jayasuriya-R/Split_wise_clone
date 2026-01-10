import { StyleSheet, View } from 'react-native'
import { Appbar, Chip, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AddGroups = () => {
  const navigation = useNavigation()
  const [groupName, setGroupName] = useState("")
  const [groups, setGroups] = useState([])

  const addNewGroup = () => {
    setGroups((prev) => [...prev, groupName])
  }
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