import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal, Portal, Divider, Button } from 'react-native-paper'
import SelectPercentage from './SelectPercentage'

const SplitByPercentage = ({ visible, close, users }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={close} contentContainerStyle={styles.modal}>
        
       
        <View style={styles.header}>
          <Text style={styles.title}>Split by Percentage</Text>
        </View>

        <Divider />

       
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <SelectPercentage user={item} />}
        />

        <View style={styles.footer}>
          <Button mode="contained" onPress={close}>
            Done
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