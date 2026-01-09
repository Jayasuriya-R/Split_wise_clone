import { StyleSheet, View } from 'react-native'
import { Appbar, Button, IconButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

const AddNewGroup = () => {
  const nav = useNavigation()
  const ScreenOptions = {
    headerShown: true,
    headerRight: (props) => (<Button {...props} mode='text' onPress={() => alert("Done")}>Done</Button>),
    headerLeft: (props) => (
      <IconButton {...props} icon={"close"} onPress={nav.goBack} />
    )
  }

  useLayoutEffect(() => {
    nav.setOptions({ ...ScreenOptions })
  }, [nav, ScreenOptions])
  return (
    <View style={{ flex: 1 }}
>
      <Text>Added new Group</Text>
    </View>
  );
}

export default AddNewGroup

const styles = StyleSheet.create({})