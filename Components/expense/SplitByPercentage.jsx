import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Modal, Portal, Divider, Button } from 'react-native-paper'
import SelectPercentage from './SelectPercentage'

const SplitByPercentage = ({ visible, close, users }) => {
  const [splitData, setSplitData] = useState({})

  const generateSplitData = (users = []) => {
    if (users.length === 0) return {}

    const data = {}
    const initialSplit = 100 / users.length

    users.forEach(user => {
      data[user.id] = initialSplit
    })

    return data
  }

  useLayoutEffect(() => {
    setSplitData(generateSplitData(users))
  }, [users])

  const isInvalidSplit = () => {
    const total = Object.values(splitData)
      .reduce((sum, value) => sum + Number(value), 0)

    return total !== 100
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={()=>close(splitData)}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Split by Percentage</Text>
        </View>

        <Divider />

        {users.length > 0 && (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <SelectPercentage
                user={item}
                splitPercentage={splitData[item.id]}
                updateSplitPercentage={(split) => {
                  setSplitData(prev => ({
                    ...prev,
                    [item.id]: Number(split)
                  }))
                }}
              />
            )}
          />
        )}

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={()=>close(splitData)}
            disabled={isInvalidSplit()}
          >
            Update
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default SplitByPercentage

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  footer: {
    padding: 16,
  },
})