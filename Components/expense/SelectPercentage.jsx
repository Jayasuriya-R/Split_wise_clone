import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'

const SelectPercentage = ({ user, splitPercentage = 0, updateSplitPercentage }) => {
  const [split, setSplit] = useState(splitPercentage.toFixed(2))
  useEffect(() => {
    setSplit(Number(splitPercentage).toFixed(2))
  }, [splitPercentage])

  const updateSplit = (val) => {
    
    if (val === '') {
      setSplit('')
      updateSplitPercentage(0)
      return
    }

    
    if (!/^\d*\.?\d*$/.test(val)) return

    setSplit(val)
    updateSplitPercentage(Number(val))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={split}
          onChangeText={updateSplit}   
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