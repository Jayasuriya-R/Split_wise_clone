import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const SelectPercentage = ({ user }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          dense
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.percent}>%</Text>
      </View>

    </View>
  )
}

export default SelectPercentage

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 80,
    height: 40,
  },
  percent: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '500',
  },
})